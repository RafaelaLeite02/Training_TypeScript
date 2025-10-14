// Tipos primitivos
let nome: string = "Rafaela";
let idade: number = 30;
let estaAprovado: boolean = true;
let sobrenome: string = undefined; // ou null
let qualquer: any = "Olá"; // qualquer tipo

// Arrays
let idades: number[] = [23, 28, 45, 32];
let nomes: string[] = ["Rafaela", "Ana", "João"];
let aprovados: boolean[] = [true, false, true];

// Tipos Personalizados (Type Aliases)
type Transaca = { // criando um tipo personalizado, Não adicionar mais campos ou erros 
    tipoTransacao: TipoTransacao;
    data: Date;
    valor: number;
}

// Enum 
enum TipoTransacao { // criando um enum
    DEPOSIT = "Depósito",
    TRANSFERENCI = "Transferência",
    PAGAMENTO_BOLET = "Pagamento de Boleto"
} 

const novaTransacao: Transaca = {
    tipoTransacao: TipoTransacao.DEPOSIT,
    data: new Date(),
    valor: 0
}

console.log(novaTransacao);





