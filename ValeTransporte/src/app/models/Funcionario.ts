export class Funcionario {

    id: number;
    nome: string;
    sobrenome: string;
    dataAdmissao: Date;
    custoDiarioVT: number;
    escalaId: number;
    escala: string;
    setorId: number;
    setor: string;

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.dataAdmissao = null;
        this.custoDiarioVT = null;
        this.escalaId = null;
        this.setorId = null;
    }

}
