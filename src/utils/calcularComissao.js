export default function calcularComissao(valorVenda, percentualBase, percentualCliente, percentualRegiao) {
    const percentualTotal =
        Number(percentualBase) +
        Number(percentualCliente) +
        Number(percentualRegiao);

    return Number((valorVenda * percentualTotal / 100).toFixed(2));
}