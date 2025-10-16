import { Transacao } from "./Transacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./tipoTransacao.js";
import { Armazenador } from "./Armazenador.js";
import { ValidaDebito } from "./Decorators.js";

export class Conta {
    protected nome: string;
    protected saldo: number = Armazenador.obter<number>("saldo") || 0;
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>(("transacoes"), (key: string, value: any) => { //função para converter a string de volta para o tipo Date
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || []; //se não tiver transações no localStorage, o array será vazio

    constructor(nome: string) { //construtor para inicializar o nome da conta
        this.nome = nome;
    }

    public getTitular() {
        return this.nome;
    }

    getGruposTransacoes(): GrupoTransacao[] { //função para agrupar as transações por tipo
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes); //structuredClone() é para criar uma cópia profunda do array
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime()); //ordenar as transações por data || sort é para ordenar o array
        let labelAtualGrupoTransacao: string = ""; //variável para armazenar o label do grupo atual

        for (let transacao of transacoesOrdenadas) { //percorrer o array de transações
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) { //se o label do grupo atual for diferente do label da transação atual, criar um novo grupo
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({ //criar um novo grupo
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }

            gruposTransacoes.at(-1).transacoes.push(transacao); //adicionar a transação ao grupo atual, .at retorna o ultimpo elemento do array
        }

        return gruposTransacoes;

    }

    getSaldo(): number { //função para pegar o saldo
        return this.saldo;
    }

    getDataAcesso(): Date { //função para pegar a data de acesso
        return new Date();
    }

    registrarTransacao(novaTransacao: Transacao): void {  //função para registrar a transação

        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) { //condição para saber se é depósito ou transferência
            this.depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1; //transformar o valor em negativo para exibir no extrato
        } else {
            throw new Error("Tipo de transação inválida");
        }

        this.transacoes.push(novaTransacao); //adicionar a nova transação ao array
        console.log(this.getGruposTransacoes());
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes)); //salvar no localStorage
    }

    @ValidaDebito
    debitar(valor: number): void { //função para debitar o valor do saldo e tratar erros
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("Valor inválido para depósito deve ser maior que zero");
        }
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }

}

export class ContaPremium extends Conta{
    //extends é para herdar os atributos e métodos da classe Conta e para restringir generics

    registrarTransacao(transacao: Transacao): void{
        if(transacao.tipoTransacao === TipoTransacao.DEPOSITO){
            console.log("Ganhou um bonus de 0.50 centavos");
            transacao.valor += 0.50;
        }

        super.registrarTransacao(transacao); //super é para chamar o método da classe pai (Conta)
    }
}

const conta = new Conta("Joana da Silva Oliveira"); //instância da classe Conta 
const contaPremium = new ContaPremium("Rafaela Leite");

export default conta;