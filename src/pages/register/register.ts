import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user = {} as User;

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

  async register(user: User) {

    // Valida se foi informado email e password
    if(user.email == "" || user.password == "")
    {  
      this.alert('Erro!', 'É necessário preencher todos os campos');
    } else {
      try {

        // Chama o método para cadastrar usuário
        const result = await this.auth.register(user);
        if (result) {
          // Se ocorrer tudo bem redireciona para a página tabs
          this.navCtrl.setRoot(HomePage);
        }
      } catch (e) {
        this.alert('Erro ao cadastrar', e.message);
      }
    }
  }

  login() {

    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    this.auth.logout();
  }

}
