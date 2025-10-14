import  Conta  from "../types/Conta.js";
import { FormatoData } from "../types/formatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatadores.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");


renderizarExtrato();
function renderizarExtrato(): void{
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = ""; //limpar o extrato antes de renderizar
    let htmlRegistroTransacoes: string = ""; //variável para armazenar o HTML do extrato

    for(let gruposTransacao of gruposTransacoes){ //percorrer o array de grupos de transações
        let htmlTransacaoItem: string = ""; //variável para armazenar o HTML do item de transação
        for(let transacao of gruposTransacao.transacoes){
            htmlTransacaoItem +=`
            <div class="transacao-item">
                        <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                        </div>
                        <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                    </div>
            `;          
        } 
        
        htmlRegistroTransacoes += `
        <div class="grupo-transacoes">
            <strong class="mes-group">${gruposTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div>
    `;
    }

    if(htmlRegistroTransacoes === ""){
        htmlRegistroTransacoes = `<div>Nenhuma transação realizada</div>`;
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes; //adicionar o HTML do extrato ao elemento

}

const ExtratoComponent = {
    atualizar(): void{
        renderizarExtrato();
    }
}

export default ExtratoComponent;