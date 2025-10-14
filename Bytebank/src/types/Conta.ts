import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./tipoTransacao.js";

let saldo: number = 3000;

function debitar(valor: number): void{
    if(valor <= 0){
        throw new Error("Valor inválido para débitado deve ser maior que zero");
    }
    if(valor > saldo){
        throw new Error("Saldo insuficiente para débito");
    }
    saldo -= valor;
}

function depositar(valor: number): void{
    if(valor <= 0){
        throw new Error("Valor inválido para depósito deve ser maior que zero");
    }
    saldo += valor;
}

const Conta = {
    getSaldo(){
        return saldo;
    },
    setDataAcesso(): Date{
        return new Date();
    },

    registrarTrancacao(novaTransacao: Transacao): void{
        
            if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO){ //condição para saber se é depósito ou transferência
                depositar(novaTransacao.valor);
            }else if(novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO){
                debitar(novaTransacao.valor);
            }else{
                throw new Error("Tipo de transação inválida");
            }

            console.log(novaTransacao);
        }
}

export default Conta;