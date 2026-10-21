import pool from "../config/database";

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
        "INSERT INTO vendedores (nome, meta_mensal, percentual_base, ativo) VALUES (?, ?, ?, ?)",
        [
            params.nome,
            params.meta_mensal ?? 0,
            params.percentual_base ?? 0,
            params.ativo ?? 1
        ]
    );

    return buscarPorId(resultado.insertId);
}

// PUT
export async function atualizar(params) {
    await pool.execute(
        "UPDATE vendedores SET nome = ?, meta_mensal = ?, percentual_base = ? WHERE id = ?",
        [params.nome, params.meta_mensal, params.percentual_base, params.id]
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
export async function desativar(id) {
    await pool.execute(
        "UPDATE vendedores SET ativo = 1 WHERE id = ?",
        [id]
    );

    return buscarPorId(id);
}