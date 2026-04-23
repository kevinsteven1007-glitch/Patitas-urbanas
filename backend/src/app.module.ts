import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { MascotasModule } from './mascotas/mascotas.module.js';
import { EntidadesModule } from './entidades/entidades.module.js';
import { ComunidadModule } from './comunidad/comunidad.module.js';
import { SeccionesAppModule } from './secciones-app/secciones-app.module.js';
import { SolicitudAdopcionModule } from './solicitud-adopcion/solicitud-adopcion.module.js';
import { EtapasAdopcionModule } from './etapas-adopcion/etapas-adopcion.module.js';
import { SolicitudVeterinariasModule } from './solicitud-veterinarias/solicitud-veterinarias.module.js';
import { SolicitudAsesoriasModule } from './solicitud-asesorias/solicitud-asesorias.module.js';
import { SolicitudEmergenciasModule } from './solicitud-emergencias/solicitud-emergencias.module.js';
import { SolicitudFundacionesModule } from './solicitud-fundaciones/solicitud-fundaciones.module.js';
import { SolicitudMascotasModule } from './solicitud-mascotas/solicitud-mascotas.module.js';
import { SolicitudRecomendacionModule } from './solicitud-recomendacion/solicitud-recomendacion.module.js';
import { GuarderiasModule } from './guarderias/guarderias.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Conexión centralizada a GCP Firestore (MongoDB API)
    DatabaseModule,
    // Módulos DAO — cada uno maneja una colección de Firestore
    MascotasModule,
    EntidadesModule,
    ComunidadModule,
    SeccionesAppModule,
    SolicitudAdopcionModule,
    EtapasAdopcionModule,
    SolicitudVeterinariasModule,
    SolicitudAsesoriasModule,
    SolicitudEmergenciasModule,
    SolicitudFundacionesModule,
    SolicitudMascotasModule,
    SolicitudRecomendacionModule,
    GuarderiasModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
