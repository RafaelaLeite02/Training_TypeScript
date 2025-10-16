var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TipoTransacao } from "./tipoTransacao.js";
import { Armazenador } from "./Armazenador.js";
import { ValidaDeposito } from "./Decorators.js";
export class Conta {
    nome;
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter(("transacoes"), (key, value) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || []; //se não tiver transações no localStorage, o array será vazio
    constructor(nome) {
        this.nome = nome;
    }
    getTitular() {
        return this.nome;
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes); //structuredClone() é para criar uma cópia profunda do array
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
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) { //condição para saber se é depósito ou transferência
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1; //transformar o valor em negativo para exibir no extrato
        }
        else {
            throw new Error("Tipo de transação inválida");
        }
        this.transacoes.push(novaTransacao); //adicionar a nova transação ao array
        console.log(this.getGruposTransacoes());
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes)); //salvar no localStorage
    }
    debitar(valor) {
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }
    depositar(valor) {
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }
}
__decorate([
    ValidaDeposito
], Conta.prototype, "debitar", null);
__decorate([
    ValidaDeposito
], Conta.prototype, "depositar", null);
export class ContaPremium extends Conta {
    //extends é para herdar os atributos e métodos da classe Conta e para restringir generics
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log("Ganhou um bonus de 0.50 centavos");
            transacao.valor += 0.50;
        }
        super.registrarTransacao(transacao); //super é para chamar o método da classe pai (Conta)
    }
}
const conta = new Conta("Joana da Silva Oliveira"); //instância da classe Conta 
const contaPremium = new ContaPremium("Rafaela Leite");
export default conta;
