import { TipoTransacao } from "./tipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0; //pegar o saldo do localStorage ou iniciar com 0
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === "data") { //converter a string de volta para Date
        return new Date(value);
    }
    return value;
}) || []; //salvar temporariamnete no localStorage
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("Valor inválido para débitado deve ser maior que zero");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente para débito");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("Valor inválido para depósito deve ser maior que zero");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes); //structuredClone() é para criar uma cópia profunda do array
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime()); //ordenar as transações por data || sort é para ordenar o array
        let labelAtualGrupoTransacao = ""; //variável para armazenar o label do grupo atual
        for (let transacao of transacoesOrdenadas) { //percorrer o array de transações
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) { //se o label do grupo atual for diferente do label da transação atual, criar um novo grupo
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao); //adicionar a transação ao grupo atual, .at retorna o ultimpo elemento do array
        }
        return gruposTransacoes;
    },
    registrarTrancacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) { //condição para saber se é depósito ou transferência
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1; //transformar o valor em negativo para exibir no extrato
        }
        else {
            throw new Error("Tipo de transação inválida");
        }
        transacoes.push(novaTransacao); //adicionar a nova transação ao array
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes)); //salvar no localStorage
    }
};
export default Conta;
