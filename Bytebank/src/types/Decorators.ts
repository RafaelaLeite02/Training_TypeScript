export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor){ //decorator para validar se o saldo é suficiente para o débito
    const originalMethod = descriptor.value; //pegar o método original

    descriptor.value = function (valorDoDebito: number){
        if(valorDoDebito <= 0){
            throw new Error("Valor inválido para débito deve ser maior que zero");
        }

        if(valorDoDebito > this.saldo){
            throw new Error("Saldo insuficiente para débito");
        }

        return originalMethod.apply(this, [valorDoDebito]); //chamar o método original
        // apply é para chamar o método com o contexto correto (this)
        // [valorDoDebito] é para passar os argumentos como um array
    }

    return descriptor;
}