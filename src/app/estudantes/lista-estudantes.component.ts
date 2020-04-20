import { Component, OnInit } from '@angular/core';
import { IEstudante } from './estudantes';
import { EstudanteService } from './estudante.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'jedi-estudantes',
    templateUrl: './lista-estudantes.component.html'
})
export class ListaEstudantesComponent implements OnInit {
    get filtroLista(): string {
        return this._filtroLista;
    }
    set filtroLista(valor: string) {
        this._filtroLista = valor;
        this.estudantesFiltrados = this.filtroLista ? this.executarFiltro(this.filtroLista) : this.estudantes;
    }

    constructor(private estudanteService: EstudanteService) {}

    tituloPagina = 'Lista de Estudantes';
    larguraImagem = 50;
    margemImagem = 2;
    exibirImagem = false;

    alturasEstudantes: number[];
    alturaMaxima: number;

    _filtroLista: string;

    estudantesFiltrados: IEstudante[];
    estudantes: IEstudante[] = [];

    ngOnInit(): void {
        this.estudantes = this.estudanteService.getEstudantes();
        this.estudantesFiltrados = this.estudantes;
        this.filtroLista = '';
        this.alturasEstudantes = this.estudantes.map(estudante => estudante.altura);
        this.alturaMaxima = Math.max.apply(null, this.alturasEstudantes);
    }

    alternarImagem(): void {
        this.exibirImagem = !this.exibirImagem;
    }

    executarFiltro(filtrarPor: string): IEstudante[] {
        filtrarPor = filtrarPor.toLocaleLowerCase();
        return this.estudantes.filter((estudante: IEstudante) =>
        estudante.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
    }

}
