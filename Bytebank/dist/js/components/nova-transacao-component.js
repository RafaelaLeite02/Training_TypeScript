import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
import Conta from "../types/Conta.js";
const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener("submit", function (event) {
    try {
        event.preventDefault(); //preventDefault() é para evitar o comportamento padrão do formulário, que é recarregar a página.
        if (!elementoForm.checkValidity()) { //checkValidity() é para verificar se o formulário é válido.
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        const inputTipoTransacao = elementoForm.querySelector("#tipoTransacao"); //puxaro campo no html
        const inputValor = elementoForm.querySelector("#valor");
        const inputData = elementoForm.querySelector("#data");
        let tipoTransacao = inputTipoTransacao.value; // salvar o valor do html no js
        let valor = inputValor.valueAsNumber; //valueAsNumber é para pegar o valor como número
        let data = new Date(inputData.value + "00:00:00"); //new Date() é para converter a string em um objeto Date
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTrancacao(novaTransacao); //chamar a função para registrar a transação
        SaldoComponent.atualizar(); //atualizar o saldo na tela
        ExtratoComponent.atualizar(); //atualizar o extrato na tela
        elementoForm.reset(); //reset() é para limpar o formulário após o envio.
    }
    catch (error) {
        alert(error.message); //exibir a mensagem de erro
    }
});
