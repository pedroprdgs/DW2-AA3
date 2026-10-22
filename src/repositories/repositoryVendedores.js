import pool from "../config/database.js";

// GET ALL
export async function buscarTodos() {
    const [vendedores] = await pool.execute(
        "SELECT * FROM vendedores"
    );

    return vendedores;
}

// GET BY ID
export async function buscarPorId(id) {
    const [vendedor] = await pool.execute(
        "SELECT * FROM vendedores WHERE id = ?",
        [id]
    );

    return vendedor[0] ?? null;
}

// POST
export async function cadastrar(params) {
    const [resultado] = await pool.execute(
        `INSERT INTO vendedores
        (nome, meta_mensal, percentual_base, ativo)
        VALUES (?, ?, ?, 1)`,
        [
            params.nome,
            params.meta_mensal,
            params.percentual_base
        ]
    );

    return buscarPorId(resultado.insertId);
}

// PUT
export async function atualizar(params) {
    await pool.execute(
        `UPDATE vendedores
        meta_mensal = ?, percentual_base = ?
        WHERE id = ?`,
        [params.meta_mensal, params.percentual_base, params.id]
    );

    return buscarPorId(params.id);
}

// PATCH - Desativar
export async function desativar(id) {
    await pool.execute(
        "UPDATE vendedores SET ativo = 0 WHERE id = ?",
        [id]
    );

    return buscarPorId(id);
}

// PATCH - Ativar
export async function ativar(id) {
    await pool.execute(
        "UPDATE vendedores SET ativo = 1 WHERE id = ?",
        [id]
    );

    return buscarPorId(id);
}