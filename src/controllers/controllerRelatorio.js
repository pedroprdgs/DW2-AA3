import * as relatorioService from "../services/serviceRelatorio.js";

export async function performance(req, res, next) {
    try {
        const { inicio, fim } = req.query;

        const relatorio = await relatorioService.gerarRelatorioPerformance(
            inicio, fim
        );

        return res.status(200).json(relatorio);
    } catch (erro) {
        next(erro);
    }
}