import * as relatorioRepository from "../repositories/repositoryRelatorio.js";
import { validarPeriodoTempo } from "../utils/validacoes.js";

export async function gerarRelatorioPerformance(inicio, fim) {
    validarPeriodoTempo(inicio, fim);

    const [
        resumo,
        vendasPorRegiao,
        vendasPorTipoCliente,
        maiorVendedor,
        maiorComissao,
        vendedoresComMetaAtingida
    ] = await Promise.all([
        relatorioRepository.buscarResumo(inicio, fim),
        relatorioRepository.buscarVendasPorRegiao(inicio, fim),
        relatorioRepository.buscarVendasPorTipoCliente(inicio, fim),
        relatorioRepository.buscarMaiorVendedor(inicio, fim),
        relatorioRepository.buscarMaiorComissao(inicio, fim),
        relatorioRepository.contarMetasAtingidas(inicio, fim),
    ]);

    return {
        periodo: {
            inicio,
            fim
        },
        resumo: {
            quantidade_vendas: Number(resumo.quantidade_vendas),
            valor_total_vendas: Number(resumo.valor_total_vendas),
            comissao_total: Number(resumo.comissao_total),
            comissao_media: Number(resumo.comissao_media ?? 0)
        },
        vendas_por_regiao: vendasPorRegiao.map((regiao) => ({
            ...regiao,
            quantidade_vendas: Number(regiao.quantidade_vendas),
            valor_total_vendas: Number(regiao.valor_total_vendas),
            comissao_media: Number(regiao.comissao_media ?? 0)
        })),
        vendas_por_tipo_cliente: vendasPorTipoCliente.map((tipo) => ({
            ...tipo,
            quantidade_vendas: Number(tipo.quantidade_vendas),
            valor_total_vendas: Number(tipo.valor_total_vendas)
        })),
        maior_vendedor: maiorVendedor
            ? {
                ...maiorVendedor,
                quantidade_vendas: Number(maiorVendedor.quantidade_vendas),
                valor_total_vendas: Number(maiorVendedor.valor_total_vendas)
            } : null,
        maior_comissao_acumulada: maiorComissao
            ? {
                ...maiorComissao,
                comissao_acumulada: Number(maiorComissao.comissao_acumulada)
            } : null,
        vendedores_com_meta_atingida: Number(vendedoresComMetaAtingida)
    };
}