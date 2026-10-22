import * as vendaRepository from "../repositories/repositoryVendas.js";
import * as vendedorRepository from "../repositories/repositoryVendedores.js";
import * as regiaoRepository from "../repositories/repositoryRegioes.js"
import criarErro from "../utils/criarErro.js";
import { validarDadoEmEnum, validarData, validarId, validarNumeroPositivo } from "../utils/validacoes.js";

// GET ALL
export async function listarVendas() {
    return vendaRepository.buscarTodos();
}

// GET BY vendedor
export async function consultarVendasPorVendedor(id) {
    validarId(id, 'id_vendedor');

    const vendedor = await vendedorRepository.buscarPorId(Number(id));

    if (!vendedor) {
        throw criarErro("Vendedor não encontrado.", 404);
    }

    return vendaRepository.buscarPorVendedor(Number(id));
}

// GET BY região
export async function consultarVendasPorRegiao(id) {
    validarId(id, 'id_regiao');

    const regiao = await regiaoRepository.buscarPorId(Number(id));

    if (!regiao) {
        throw criarErro("Região não encontrada.", 404);
    }

    return vendaRepository.buscarPorRegiao(Number(id));
}

// POST
export async function registrarVenda(dados) {
    validarId(dados.id,);
    validarId(dados.id_vendedor, 'id_vendedor');
    validarId(dados.id_regiao, 'id_regiao');

    validarNumeroPositivo(dados.valor_venda, 'valor_venda');

    validarDadoEmEnum(dados.tipo_cliente, ["PF", "PJ"], 'tipo_cliente');

    validarData(dados.data_venda, 'data_venda');

    const vendedor = await vendedorRepository.buscarPorId(Number(dados.id_vendedor));

    if (!vendedor) {
        throw criarErro("Vendedor não encontrado.", 404);
    }

    if (!vendedor.ativo) {
        throw criarErro("Vendedor inativo.", 400);
    }

    const regiao = await regiaoRepository.buscarPorId(Number(dados.id_regiao));

    if (!regiao) {
        throw criarErro("Região não encontrada.", 404);
    }

    // Calculo simples de percentual do cliente
    const percentualCliente = dados.tipo_cliente === "PF" ? 2 : 3;

    const valorComissao = calcularComissao(dados.valor_venda, vendedor.percentual_base, percentualCliente, regiao.percentual_bonus);

    return vendaRepository.cadastrar({
        id_vendedor: Number(dados.id_vendedor),
        id_regiao: Number(dados.id_regiao),
        data_venda: dados.data_venda,
        valor_venda: dados.valor_venda,
        tipo_cliente: dados.tipo_cliente,
        valor_comissao: valorComissao
    });
}

// DELETE
export async function excluirVenda(id) {
    validarId(id);

    const venda = await vendaRepository.buscarPorId(Number(id));

    if (!venda) {
        throw criarErro("Venda não encontrada.", 404);
    }

    await vendaRepository.deletar(Number(id));

    return { mensagem: "Venda excluida com sucesso." };
}