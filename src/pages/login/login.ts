import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // Definindo o nosso atributo usuário do tipo User
  public user = {} as User;

  // Aqui no contrutor vamos adicionar o AuthProvider e o AlertController
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthProvider, private alertCtrl: AlertController
  ) { }


  // Método para exibir as nossas mensagens de erro.
  alert(title, message) {
    let al = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Fechar']
    });
    al.present();
  }

  // Método usado para login do usuário
  // Recebe como parametro um tipo user e tenta fazer o login
  async login(user: User) {
    // Valida se foi informado email e password
    if(user.email == "" || user.password == "")
    {
      this.alert('Erro!', 'É necessário informar o email e senha');
    } else {
      try {
        // Chama o método para fazer login
        const result = await this.auth.login(user);
        if (result) {
          // Se ocorrer tudo bem redireciona para a página tabs
          
          this.navCtrl.setRoot(HomePage, {
            user: this.user.email
          });
        }
      } catch (e) {
        this.alert('Erro ao entrar!', e.message);
      }
    }
  }

   register() {

    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    // Toda vez que um usuário acessar a página de login ele será deslogado
    this.auth.logout();
  }

}