export function ValidaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; //pegar o método original
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error("Valor inválido para débito deve ser maior que zero");
        }
        if (valorDoDebito > this.saldo) {
            throw new Error("Saldo insuficiente para débito");
        }
        return originalMethod.apply(this, [valorDoDebito]); //chamar o método original
        // apply é para chamar o método com o contexto correto (this)
        // [valorDoDebito] é para passar os argumentos como um array
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; //pegar o método original
    descriptor.value = function (valorDoDeposito) {
        if (valorDoDeposito <= 0) {
            throw new Error("Valor inválido para depósito deve ser maior que zero");
        }
        return originalMethod.apply(this, [valorDoDeposito]); //chamar o método original
    };
    return descriptor;
}
