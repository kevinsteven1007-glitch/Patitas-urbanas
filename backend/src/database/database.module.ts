import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        const uri = configService.get<string>('MONGODB_URI');

        if (!uri) {
          logger.error('❌ MONGODB_URI no está definida en .env');
          throw new Error(
            'MONGODB_URI no está definida. Crea el archivo .env con tu URI de Firestore.',
          );
        }

        // Validar parámetros obligatorios para GCP Firestore (AGENT_RULES.md Regla 4)
        const requiredParams = [
          'loadBalanced=true',
          'tls=true',
          'authMechanism=SCRAM-SHA-256',
          'retryWrites=false',
        ];
        const missingParams = requiredParams.filter(
          (param) => !uri.includes(param),
        );

        if (missingParams.length > 0) {
          logger.error(
            `❌ La URI no incluye parámetros obligatorios de Firestore: ${missingParams.join(', ')}`,
          );
          throw new Error(
            `URI de conexión incompleta. Parámetros faltantes: ${missingParams.join(', ')}`,
          );
        }

        logger.log(
          '✅ URI de Firestore validada correctamente. Conectando...',
        );

        return {
          uri,
          // Opciones resilientes para Cloud Run: arranque sin bloquear en la BD
          serverSelectionTimeoutMS: 30000,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 45000,
          heartbeatFrequencyMS: 10000,
          retryWrites: false,
          connectionFactory: (connection: any) => {
            connection.on('connected', () => {
              logger.log(
                '✅ Conexión exitosa a GCP Firestore (MongoDB API)',
              );
            });
            connection.on('error', (error: any) => {
              logger.error('❌ Error de conexión a Firestore:', error.message);
            });
            connection.on('disconnected', () => {
              logger.warn('⚠️ Desconectado de Firestore');
            });
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
