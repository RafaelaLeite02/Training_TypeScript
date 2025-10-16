export class Armazenador {
    constructor() { }
    static salvar(chave, valor) {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString); //salvar no localStorage
    }
    static obter(chave, reviver) {
        // reviver é uma função para customizar o processo de parsing do JSON
        // T é um tipo generico para indicar que a função pode retornar qualquer tipo
        const valor = localStorage.getItem(chave); //pegar o valor do localStorage
        if (valor === null) { //se não tiver valor,
            return null;
        }
        if (reviver) { //se tiver reviver, usar ele para converter a string de volta para o tipo Date
            return JSON.parse(valor, reviver);
        }
        return JSON.parse(valor); //converter a string de volta para o tipo T (tipo generico)
    }
}
