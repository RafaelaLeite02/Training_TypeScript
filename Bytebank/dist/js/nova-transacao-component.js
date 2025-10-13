const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener("submit", function (event) {
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
    let data = new Date(inputData.value); //new Date() é para converter a string em um objeto Date
    if (tipoTransacao == TipoTransacao.DEPOSITO) { //condição para saber se é depósito ou transferência
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert("Tipo de transação inválida.");
        return;
    }
    elementoSaldo.textContent = formatarMoeda(saldo); //atualizar o saldo na tela
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoForm.reset(); //reset() é para limpar o formulário após o envio.
});
