import criarErro from "./criarErro.js";

export function validarId(id, campo="id") {
    if (!Number.isInteger(id) || Number(id) <= 0) {
        throw criarErro(`ID inválido no campo ${campo}`, 400);
    }
}

export function validarStringObrigatoria(dado, maximo, campo) {
    if (typeof dado !== "string" || !dado.trim()) {
        throw criarErro(`Campo ${campo} vazio ou inválido.`, 400);
    }

    if (dado.trim().length > maximo) {
        throw criarErro(`Campo ${campo} deve ter no máximo ${maximo} caracteres.`, 400);
    }
}

export function validarNumeroPositivo(numero, campo) {
    if (typeof numero !== "number" || !Number.isFinite(numero) || numero < 0) {
        throw criarErro(`Campo ${campo} deve ser um número não negativo.`, 400);
    }
}

export function validarPercentual(percentual, campo) {
    if (typeof percentual !== "number" || !Number.isFinite(percentual) || percentual < 0 || percentual > 100) {
        throw criarErro(`Campo ${campo} deve ser um percentual entre 0 e 100.`, 400);
    }
}

export function validarDadoEmEnum(dado, valores, campo) {
    if (!valores.includes(dado)) {
        throw criarErro(`Campo ${campo} deve ter valor entre ${valores.join()}.`, 400);
    }
}

export function validarData(data, campo) {
    if (typeof data !== "string" || !data.trim() || Number.isNaN(Date.parse(data))) {
        throw criarErro(`Campo ${campo} deve ser uma data válida.`, 400);
    }
}

export function validarDataSimples(data) {
    if (typeof data !== "string") {
        return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        return false;
    }

    const dataConvertida = new Date(`${data}T00:00:00.000Z`);

    return (
        !Number.isNaN(dataConvertida.getTime()) &&
        dataConvertida.toISOString().slice(0, 10) === data
    );
}

export function validarPeriodoTempo(inicio, fim) {
    if (!validarDataSimples(inicio)) {
        throw criarErro("A data inicial é obrigatória e deve estar no formato YYYY-MM-DD.", 400)
    }

    if (!validarDataSimples(fim)) {
        throw criarErro("A data final é obrigatória e deve estar no formato YYYY-MM-DD.", 400)
    }

    if (inicio > fim) {
        throw criarErro("A data inicial não pode ser posterior à data final.", 400)
    }
}