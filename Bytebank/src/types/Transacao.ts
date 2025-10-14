import { TipoTransacao } from "./tipoTransacao.js";

export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;

}