import * as vendedorService from '../services/serviceVendedores.js';

// GET ALL
export async function listar(_req, res, next) {
    try {
        const vendedores = await vendedorService.listarVendedores();

        return res.status(200).json(vendedores);
    } catch (erro) {
        next(erro);
    }
}

// GET BY ID
export async function buscarPorId(req, res, next) {
    try {
        const vendedor = await vendedorService.buscarVendedor(Number(req.params.id));

        return res.status(200).json(vendedor);
    } catch (erro) {
        next(erro);
    }
}

// POST
export async function cadastrar(req, res, next) {
    try {
        const vendedor = await vendedorService.cadastrarVendedor(req.body);

        return res.status(201).json(vendedor);
    } catch (erro) {
        next(erro);
    }
}

// PUT
export async function atualizar(req, res, next) {
    try {
        const vendedor = await vendedorService.atualizarVendedor(Number(req.params.id), req.body);

        return res.status(200).json(vendedor);
    } catch (erro) {
        next(erro);
    }
}

// PATCH - Desativar
export async function desativar(req, res, next) {
    try {
        const vendedor = await vendedorService.desativarVendedor(Number(req.params.id));

        return res.status(200).json(vendedor);
    } catch (erro) {
        next(erro);
    }
}

// PATCH - Ativar
export async function ativar(req, res, next) {
    try {
        const vendedor = await vendedorService.ativarVendedor(Number(req.params.id));

        return res.status(200).json(vendedor);
    } catch (erro) {
        next(erro);
    }
}