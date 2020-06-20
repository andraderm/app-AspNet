import { Despesa } from './Despesa';
import { Funcionario } from './Funcionario';

export class DespesaFuncionario {

    despesaId: number;
    despesa: Despesa;
    funcionarioId: number;
    funcionario: Funcionario;
    diasTrabalhados: number;
    custoIndividual: number;

    constructor() {
        this.despesaId = 0;
        this.funcionarioId = 0;
        this.diasTrabalhados = 0;
        this.custoIndividual = 0.0;
    }
}
