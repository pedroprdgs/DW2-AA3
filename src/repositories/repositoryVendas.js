import pool from "../config/database";

// GET ALL
export async function buscarTodos() {
    const [vendas] = await pool.execute(
        "SELECT * FROM vendas"
    );

    return vendas;
}

// GET BY vendedor
export async function buscarPorVendedor(idVendedor) {
    const [vendas] = await pool.execute(
        "SELECT vendas.*, vendedores.nome FROM vendas " +
        "INNER JOIN vendedores ON vendas.id_vendedor = vendedores.id " +
        "WHERE id_vendedor = ? " +
        "ORDER BY valor_venda DESC",
        [idVendedor]
    );

    return vendas;
}

// GET BY região
export async function buscarPorRegiao(idRegiao) {
    const [vendas] = await pool.execute(
        "SELECT vendas.*, regioes.nome FROM vendas " +
        "INNER JOIN regioes ON vendas.id_regiao = regioes.id " +
        "WHERE id_regiao = ? " +
        "ORDER BY valor_venda DESC",
        [idRegiao]
    );

    return vendas;
}

// POST
export async function cadastrar(params) {
    const [resultado] = await pool.execute(
        "INSERT INTO vendas (id_vendedor, id_regiao, data_venda, valor_venda, tipo_cliente, valor_comissao) " +
        "VALUES (?, ?, ?, ?, ?, ?)",
        [
            params.id_vendedor,
            params.id_regiao,
            params.data_venda ?? new Date(),
            params.valor_venda,
            params.tipo_cliente ?? 'PF',
            params.valor_comissao ?? 0
        ]
    );

    return buscarPorId(resultado.insertId);
}

// DELETE
export async function cadastrar(id) {
    await pool.execute(
        "DELETE FROM vendas WHERE id = ?",
        [id]
    );
}