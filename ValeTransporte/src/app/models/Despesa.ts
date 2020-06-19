import { DespesaFuncionario } from './DespesaFuncionario';

export class Despesa {

    id: number;
    dataInicial: Date;
    dataFinal: Date;
    valorTotal: number;
    despesaFuncionario: DespesaFuncionario;

    constructor() {
        this.id = 0;
        this.dataInicial = null;
        this.dataFinal = null;
        this.valorTotal = 0.0;
    }
}
