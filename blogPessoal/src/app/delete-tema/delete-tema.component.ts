import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-delete-tema',
  templateUrl: './delete-tema.component.html',
  styleUrls: ['./delete-tema.component.css']
})
export class DeleteTemaComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    window.scroll(0,0)
    let id:number = this.route.snapshot.params["id"];
    this.findByIdTema(id)

  }

  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    });
  }

  btnSim() {
    if (this.tema.postagem.length != 0) {
      alert('Esse tema não pode ser modificado, pois já pertence a uma postagem.')
      this.router.navigate(['/cadastro-tema'])
    } else {
      this.temaService.deleteTema(this.tema.id).subscribe(() => {
        this.router.navigate(['/cadastro-tema'])
        alert('Tema apagado com sucesso!')
      })
    }

  }

  btnNao() {
    this.router.navigate(['/cadastro-tema'])
  }

}
