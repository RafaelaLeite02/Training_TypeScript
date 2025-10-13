let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor"); //puxar o elemento do html
const elementoDataAcesso = document.querySelector(".block-saldo time");
if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(saldo);
}
if (elementoDataAcesso != null) {
    const dataAtual = new Date();
    elementoDataAcesso.textContent = formatarData(dataAtual, FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
