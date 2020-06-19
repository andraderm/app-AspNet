import { Despesa } from './Despesa';

export class DespesaFuncionario {

    despesaId: number;
    despesa: Despesa;
    funcionarioId: number;
    diasTrabalhados: number;

    constructor() {
        this.despesaId = 0;
        this.despesa = null;
        this.funcionarioId = 0;
        this.diasTrabalhados = 0;
    }
}
