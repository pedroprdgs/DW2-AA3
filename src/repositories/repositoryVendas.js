import pool from "../config/database";

// GET ALL
export async function buscarTodos() {
    const [vendas] = await pool.execute(
        `SELECT v.*, ven.nome AS nome_vendedor, r.nome AS regiao FROM vendas v
        JOIN vendedores ven ON ven.id = v.id_vendedor
        JOIN regioes r ON r.id = v.id_regiao
        ORDER BY v.data_venda DESC`
    );

    return vendas;
}

// GET BY ID
export async function buscarPorId(id) {
    const [venda] = await pool.execute(
        "SELECT * FROM vendas WHERE id = ?",
        [id]
    );

    return venda[0] ?? null;
}

// GET BY vendedor
export async function buscarPorVendedor(idVendedor) {
    const [vendas] = await pool.execute(
        `SELECT v.*, ven.nome AS nome_vendedor, r.nome AS regiao FROM vendas v
        JOIN vendedores ven ON ven.id = v.id_vendedor
        JOIN regioes r ON r.id = v.id_regiao
        WHERE v.id_vendedor = ?
        ORDER BY v.data_venda DESC`,
        [idVendedor]
    );

    return vendas;
}

// GET BY região
export async function buscarPorRegiao(idRegiao) {
    const [vendas] = await pool.execute(
        `SELECT v.*, ven.nome AS nome_vendedor, r.nome AS regiao FROM vendas v
        JOIN vendedores ven ON ven.id = v.id_vendedor
        JOIN regioes r ON r.id = v.id_regiao
        WHERE v.id_regiao = ?
        ORDER BY v.data_venda DESC`,
        [idRegiao]
    );

    return vendas;
}

// POST
export async function cadastrar(params) {
     const [venda] = await pool.execute(
        `INSERT INTO vendas (id_vendedor, id_regiao, data_venda, valor_venda, tipo_cliente, valor_comissao)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            params.id_vendedor,
            params.id_regiao,
            params.data_venda,
            params.valor_venda,
            params.tipo_cliente,
            params.valor_comissao
        ]
    );

    return buscarPorId(venda.insertId);
}

// DELETE
export async function deletar(id) {
    const [resultado] = await pool.execute(
        "DELETE FROM vendas WHERE id = ?",
        [id]
    );

    return resultado.affectedRows > 0;
}