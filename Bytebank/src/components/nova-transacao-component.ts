
import { TipoTransacao } from "../types/tipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
import Conta from "../types/Conta.js";

const elementoForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoForm.addEventListener("submit", function(event){ //.addEventListener é para detectar quando um evento específico ocorre nele.
try{
    event.preventDefault(); //preventDefault() é para evitar o comportamento padrão do formulário, que é recarregar a página.

    if(!elementoForm.checkValidity()){ //checkValidity() é para verificar se o formulário é válido.
        alert("Por favor, preencha todos os campos corretamente.");
        return;  
    }

    const inputTipoTransacao = elementoForm.querySelector("#tipoTransacao") as HTMLSelectElement; //puxaro campo no html
    const inputValor = elementoForm.querySelector("#valor") as HTMLInputElement;
    const inputData = elementoForm.querySelector("#data") as HTMLInputElement;

    let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao; // salvar o valor do html no js
    let valor: number = inputValor.valueAsNumber; //valueAsNumber é para pegar o valor como número

    let data: Date;
    if (inputData.value) {
        const partes = inputData.value.split("-").map(v => Number(v)); 
        // split("-") é para separar a string em partes usando o hífen como separador.
        // map(v => Number(v)) é para converter cada parte em número.
        // Lembrando que o mês em JavaScript é baseado em zero (0-11), então precisamos subtrair 1 do valor do mês.
        const ano = partes[0];
        const mes = partes[1] - 1; // monthIndex (0-11)
        const dia = partes[2];
        data = new Date(ano, mes, dia);
    } else {
        data = new Date();
    }

    const novaTransacao: Transacao = {  //criação de um objeto literal para salvar os dados da transação
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }

    Conta.registrarTrancacao(novaTransacao); //chamar a função para registrar a transação
    SaldoComponent.atualizar(); //atualizar o saldo na tela
    ExtratoComponent.atualizar(); //atualizar o extrato na tela
    elementoForm.reset(); //reset() é para limpar o formulário após o envio.
}
catch(error){
    alert(error.message); //exibir a mensagem de erro
}
    
});