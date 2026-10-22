import * as vendaService from "../services/serviceVendas.js"

// GET ALL
export async function listar(req, res, next) {
    try {
        const vendas = await vendaService.listarVendas();

        return res.status(200).json(vendas);
    } catch (erro) {
        next(erro);
    }
}

// GET BY vendedor
export async function consultarPorVendedor(req, res, next) {
    try {
        const vendas = await vendaService.consultarVendasPorVendedor(req.params.id);

        return res.status(200).json(vendas);
    } catch (erro) {
        next(erro);
    }
}

// GET BY região
export async function consultarPorRegiao(req, res, next) {
    try {
        const vendas = await vendaService.consultarVendasPorRegiao(req.params.id);

        return res.status(200).json(vendas);
    } catch (erro) {
        next(erro);
    }
}

// POST
export async function registrar(req, res, next) {
    try {
        const venda = await vendaService.registrarVenda(req.body);

        return res.status(201).json(venda);
    } catch (erro) {
        next(erro);
    }
}

// DELETE
export async function excluir(req, res, next) {
    try {
        const resultado = await vendaService.excluirVenda(req.params.id);

        return res.status(200).json(resultado);
    } catch (erro) {
        next(erro);
    }
}