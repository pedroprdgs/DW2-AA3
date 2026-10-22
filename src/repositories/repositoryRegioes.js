import pool from "../config/database";

export async function buscarRegiaoPorId(id) {
    const [regiao] = await pool.execute(
        "SELECT * FROM regioes WHERE id = ?",
        [id]
    );

    return regiao[0] ?? null
}