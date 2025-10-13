// Tipos primitivos
let nome = "Rafaela";
let idade = 30;
let estaAprovado = true;
let sobrenome = undefined; // ou null
let qualquer = "Olá"; // qualquer tipo
// Arrays
let idades = [23, 28, 45, 32];
let nomes = ["Rafaela", "Ana", "João"];
let aprovados = [true, false, true];
// Enum 
var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSIT"] = "Dep\u00F3sito";
    TipoTransacao["TRANSFERENCI"] = "Transfer\u00EAncia";
    TipoTransacao["PAGAMENTO_BOLET"] = "Pagamento de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
const novaTransacao = {
    tipoTransacao: TipoTransacao.DEPOSITO,
    data: new Date(),
    valor: 0
};
console.log(novaTransacao);
