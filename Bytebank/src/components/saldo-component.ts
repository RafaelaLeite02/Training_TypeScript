import { formatarMoeda, formatarData } from "../utils/formatadores.js";
import { FormatoData } from "../types/formatoData.js";
import Conta from "../types/Conta.js";


const elementoSaldo = document.querySelector(".saldo-valor .valor")  as HTMLElement; //puxar o elemento do html
const elementoDataAcesso = document.querySelector(".block-saldo time")  as HTMLElement;

if(elementoDataAcesso != null){
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

renderizarSaldo(); //chamar a função para atualizar o saldo na tela
export function renderizarSaldo(): void{
    if(elementoSaldo != null){
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
} 
}

const SaldoComponent  = {
    atualizar(){
        renderizarSaldo();
    }
};

export default SaldoComponent;