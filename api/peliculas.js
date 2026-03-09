const { Pool } = require('pg');

const pool = new Pool({
  // Vercel inyectará tu cadena de conexión automáticamente aquí
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  try {
    const client = await pool.connect();
    // Pedimos todas las películas a tu base de datos en Neon
    const result = await client.query('SELECT * FROM peliculas ORDER BY id ASC');
    client.release();
    
    // Le enviamos los datos a tu web
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error de base de datos:', error);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
};