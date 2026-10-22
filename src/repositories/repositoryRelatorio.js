import pool from "../config/database.js";

// Indicadores gerais do período
export async function buscarResumo(inicio, fim) {
    const [resultado] = await pool.execute(
        `SELECT
            COUNT(*) AS quantidade_vendas,
            COALESCE(SUM(valor_venda), 0) AS valor_total_vendas,
            COALESCE(SUM(valor_comissao), 0) AS comissao_total,
            AVG(valor_comissao) AS comissao_media
        FROM vendas
        WHERE data_venda >= ? AND data_venda < DATE_ADD(?, INTERVAL 1 DAY)`,
        [inicio, fim]
    );

    return resultado[0];
}

// Vendas agrupadas por região
export async function buscarVendasPorRegiao(inicio, fim) {
    const [resultado] = await pool.execute(
        `SELECT
            r.id,
            r.nome,
            COUNT(v.id) AS quantidade_vendas,
            COALESCE(SUM(v.valor_venda), 0) AS valor_total_vendas,
            AVG(v.valor_comissao) AS comissao_media
        FROM regioes r
        LEFT JOIN vendas v
            ON v.id_regiao = r.id
            AND v.data_venda >= ?
            AND v.data_venda < DATE_ADD(?, INTERVAL 1 DAY)
        GROUP BY r.id, r.nome
        ORDER BY valor_total_vendas DESC`,
        [inicio, fim]
    );

    return resultado;
}

// Vendas agrupadas por tipo de cliente
export async function buscarVendasPorTipoCliente(inicio, fim) {
    const [resultado] = await pool.execute(
        `SELECT
            tipo_cliente,
            COUNT(*) AS quantidade_vendas,
            SUM(valor_venda) AS valor_total_vendas
        FROM vendas
        WHERE data_venda >= ?
            AND data_venda < DATE_ADD(?, INTERVAL 1 DAY)
        GROUP BY tipo_cliente
        ORDER BY tipo_cliente`,
        [inicio, fim]
    );

    return resultado;
}

// Vendedor com maior valor total em vendas
export async function buscarMaiorVendedor(inicio, fim) {
    const [resultado] = await pool.execute(
        `SELECT
            ven.id,
            ven.nome,
            COUNT(v.id) AS quantidade_vendas,
            SUM(v.valor_venda) AS valor_total_vendas
        FROM vendedores ven
        INNER JOIN vendas v
            ON v.id_vendedor = ven.id
        WHERE v.data_venda >= ?
            AND v.data_venda < DATE_ADD(?, INTERVAL 1 DAY)
        GROUP BY ven.id, ven.nom
        ORDER BY valor_total_vendas DESC
        LIMIT 1`,
        [inicio, fim]
    );

    return resultado[0] ?? null;
}

// Vendedor com maior comissão acumulada
export async function buscarMaiorComissao(inicio, fim) {
    const [resultado] = await pool.execute(
        `SELECT
            ven.id,
            ven.nome,
            SUM(v.valor_comissao) AS comissao_acumulada
        FROM vendedores ven
        INNER JOIN vendas v
            ON v.id_vendedor = ven.id
        WHERE v.data_venda >= ?
            AND v.data_venda < DATE_ADD(?, INTERVAL 1 DAY)
        GROUP BY ven.id, ven.nome
        ORDER BY comissao_acumulada DESC
        LIMIT 1`
    );

    return resultado[0] ?? null;
}

// Quantidade de vendedores que atingiram a meta no período
export async function contarMetasAtingidas(inicio, fim) {
    const [resultado] = await pool.execute(
        `SELECT COUNT(*) AS vendedores_com_meta_atingida
        FROM (
            SELECT
                ven.id,
                ven.meta_mensal,
                SUM(v.valor_venda) AS total_vendas
            FROM vendedores ven
            INNER JOIN vendas v
                ON v.id_vendedor = ven.id
            WHERE v.data_venda >= ?
                AND v.data_venda < DATE_ADD(?, INTERVAL 1 DAY)
            GROUP BY ven.id, ven.meta_mensal
            HAVING SUM(v.valor_mensal) >= ven.meta_mensal
        ) AS vendedores_meta`,
    [inicio, fim]
    );

    return resultado[0].vendedores_com_meta_atingida;
}