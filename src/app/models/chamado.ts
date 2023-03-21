import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Chamado {

    id?: any;
    dataAbertura? : string;
    dataFechamento?: string;
    prioridade: string;
    status : string;
    titulo: string;
    observacoes:string;
    cliente: any;
    tecnico: any;
    nomeCliente: string;
    nomeTecnico: string;

}