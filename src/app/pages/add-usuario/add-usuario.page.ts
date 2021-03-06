import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';



@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})

export class AddUsuarioPage implements OnInit {
  
  public usuario:Usuario;
  
  

  constructor(public alertController: AlertController, public router: Router
    ,public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = new Usuario;
  }

  onSubmit(form){

    if (form.valid){
      this.usuarioService.save(this.usuario)
        // tentar/então com dois resultados verdadeiro ou falso
        .then( 
          res=>{
            this.presentAlert("Aviso","Cadastrado!");
            form.reset;
            this.router.navigate(['/']);
          },
          err=>{
            this.presentAlert("Opa!","Erro ao cadastrado!");
          }
        )
      
    }
}

  async presentAlert(titulo:string,texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
     //subHeader:'',
      message: texto,
      buttons: ['Talkey']
    });

    await alert.present();
  }
}
