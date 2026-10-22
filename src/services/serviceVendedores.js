import * as vendedorRepository from '../repositories/repositoryVendedores.js';
import { validarId, validarStringObrigatoria, validarNumeroPositivo, validarPercentual } from '../utils/validacoes.js';
import criarErro from '../utils/criarErro.js';

const MAXIMO_CARACTERES_NOME = 100;

// GET ALL
export async function listarVendedores() {
    return vendedorRepository.buscarTodos();
}

// GET BY ID
export async function buscarVendedor(id) {
    validarId(id);

    const vendedor = await vendedorRepository.buscarPorId(id);

    if (!vendedor) {
        throw criarErro("Vendedor não encontrado.", 404);
    }

    return vendedor;
}

// POST
export async function cadastrarVendedor(dados) {
    validarStringObrigatoria(dados.nome, MAXIMO_CARACTERES_NOME, 'nome');
    validarNumeroPositivo(dados.meta_mensal, 'meta_mensal');
    validarPercentual(dados.percentual_base, 'percentual_base');

    return vendedorRepository.cadastrar({
        nome: dados.nome.trim(),
        meta_mensal: dados.meta_mensal,
        percentual_base: dados.percentual_base
    });
}

// PUT
export async function atualizarVendedor(id, dados) {
    validarId(id);
    validarNumeroPositivo(dados.meta_mensal, 'meta_mensal');
    validarPercentual(dados.percentual_base, 'percentual_base');

    await buscarVendedor(id);

    return vendedorRepository.atualizar(
        id,
        {
            meta_mensal: dados.meta_mensal,
            percentual_base: dados.percentual_base
        }
    );
}

// PATCH - Desativar
export async function desativarVendedor(id) {
    validarId(id);

    await buscarVendedor(id);

    return vendedorRepository.desativar(id);
}

// PATCH - Ativar
export async function ativarVendedor(id) {
    validarId(id);

    await buscarVendedor(id);

    return vendedorRepository.ativar(id);
}