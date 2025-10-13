
const elementoForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoForm.addEventListener("submit", function(event){ //.addEventListener é para detectar quando um evento específico ocorre nele.
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
    let data: Date = new Date(inputData.value); //new Date() é para converter a string em um objeto Date

    if(tipoTransacao == TipoTransacao.DEPOSITO){ //condição para saber se é depósito ou transferência
        saldo += valor;
    }else if(tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO){
        saldo -= valor;
    }else{
        alert("Tipo de transação inválida.");
        return;
    }

    elementoSaldo.textContent = formatarMoeda(saldo); //atualizar o saldo na tela
    const novaTransacao: Transacao = {  //criação de um objeto literal para salvar os dados da transação
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }

    console.log(novaTransacao);
    elementoForm.reset(); //reset() é para limpar o formulário após o envio.
    
});