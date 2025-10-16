export class Armazenador {
    private constructor() { }

    static salvar(chave: string, valor: any): void{
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString); //salvar no localStorage

    }

    static obter<T>(chave: string, reviver?: (this: any, key: string, valur: any) => any): T | null{ 
        // reviver é uma função para customizar o processo de parsing do JSON
        // T é um tipo generico para indicar que a função pode retornar qualquer tipo
        const valor = localStorage.getItem(chave); //pegar o valor do localStorage

        if(valor === null){ //se não tiver valor,
            return null
        }

        if(reviver){ //se tiver reviver, usar ele para converter a string de volta para o tipo Date
            return JSON.parse(valor, reviver) as T
        }

        return JSON.parse(valor) as T //converter a string de volta para o tipo T (tipo generico)
    }

}
