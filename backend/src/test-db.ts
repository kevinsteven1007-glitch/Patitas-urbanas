import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

/**
 * Script independiente para probar la conexión a GCP Firestore (MongoDB API).
 * Ejecutar: npx ts-node src/test-db.ts
 */
async function testConnection() {
  const uri = process.env.MONGODB_URI;

  console.log('═══════════════════════════════════════════════════');
  console.log('  🐾 Patitas Urbanas — Prueba de Conexión a BD');
  console.log('═══════════════════════════════════════════════════\n');

  // 1. Verificar que MONGODB_URI esté definida
  if (!uri) {
    console.error('❌ MONGODB_URI no está definida en el archivo .env');
    console.error('   Crea un archivo .env basándote en .env.example');
    process.exit(1);
  }
  console.log('✅ Variable MONGODB_URI encontrada en .env');

  // 2. Verificar parámetros obligatorios para Firestore (AGENT_RULES.md Regla 4)
  const requiredParams = [
    'loadBalanced=true',
    'tls=true',
    'authMechanism=SCRAM-SHA-256',
    'retryWrites=false',
  ];
  const missingParams = requiredParams.filter((param) => !uri.includes(param));

  if (missingParams.length > 0) {
    console.error('❌ La URI no incluye parámetros obligatorios de Firestore:');
    missingParams.forEach((p) => console.error(`   - ${p}`));
    process.exit(1);
  }
  console.log('✅ Todos los parámetros obligatorios de Firestore presentes');

  // 3. Intentar conectar
  console.log('\n⏳ Conectando a la base de datos...\n');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000, // 15 segundos máximo
    });

    console.log('✅ ¡Conexión exitosa a GCP Firestore (MongoDB API)!');

    // 4. Obtener la referencia a la BD de forma segura
    const db = conn.connection.getClient().db();

    // 5. Listar colecciones disponibles
    const collections = await db.listCollections().toArray();
    console.log(`\n📂 Colecciones encontradas: ${collections.length}`);
    collections.forEach((col) => {
      console.log(`   • ${col.name}`);
    });

    // 6. Contar documentos en la colección 'mascotas' si existe
    const mascotasCol = collections.find((c) => c.name === 'mascotas');
    if (mascotasCol) {
      const count = await db.collection('mascotas').countDocuments();
      console.log(`\n🐶 Documentos en "mascotas": ${count}`);

      // 7. Intentar leer un documento de ejemplo
      if (count > 0) {
        const ejemplo = await db.collection('mascotas').findOne();
        console.log('\n📋 Ejemplo de documento en "mascotas":');
        console.log(JSON.stringify(ejemplo, null, 2));
      }
    }

    // 8. Contar documentos en 'entidades' si existe
    const entidadesCol = collections.find((c) => c.name === 'entidades');
    if (entidadesCol) {
      const count = await db.collection('entidades').countDocuments();
      console.log(`\n👥 Documentos en "entidades": ${count}`);
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log('  ✅ RESULTADO: Conexión EXITOSA');
    console.log('═══════════════════════════════════════════════════');
  } catch (error: any) {
    console.error('═══════════════════════════════════════════════════');
    console.error('  ❌ RESULTADO: Conexión FALLIDA');
    console.error('═══════════════════════════════════════════════════');
    console.error(`\n  Error: ${error.message}`);

    if (error.message.includes('ENOTFOUND')) {
      console.error('\n  💡 Sugerencia: Verifica que la URL del cluster sea correcta.');
    } else if (error.message.includes('Authentication')) {
      console.error('\n  💡 Sugerencia: Verifica tu usuario y contraseña en la URI.');
    } else if (error.message.includes('timed out')) {
      console.error('\n  💡 Sugerencia: Verifica tu conexión a internet y que la IP esté permitida en Firestore.');
    }

    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Conexión cerrada.');
    process.exit(0);
  }
}

testConnection();
