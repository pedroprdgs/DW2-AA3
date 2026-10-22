export default function criarErro(mensagem, status) {
    const erro = new Error(mensagem);
    erro.status = Number(status);

    return erro;
}