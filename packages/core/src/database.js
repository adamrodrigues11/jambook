import pg from 'pg'
const { Pool } = pg

let pool
function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      application_name: "jambook",
      max: 1,
    });
  }
  return pool
}

export async function getDummyData() {
    const res = await getPool().query(`
        SELECT * FROM dummy`);
    return res.rows[0];
}

export async function getSongs() {
    const res = await getPool().query(`
        SELECT * FROM song`);
    return res.rows;
}

export async function createSong(name, song) {
    const res = await getPool().query(`
        INSERT INTO song (name, normalized_name, chordmark)
        VALUES ($1, $2, $3)
        RETURNING *`, [name, name.toLowerCase() , song]);
    return res.rows[0];
}