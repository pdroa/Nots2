import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-nova-nota',
  templateUrl: 'nova-nota.html',
})
export class NovaNotaPage {
  
  data = {  
    titulo:'',
    descricao:'',
    user:''
   };
  user:string;
  ref = firebase.database().ref('notas/');  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user") as string;
    this.data.user = this.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaNotaPage');
  }

  addNota() {
    let newData = this.ref.push();
    newData.set({
      nota:this.data.titulo,
      descricao: this.data.descricao,
      user: this.data.user
    }); 
      this.navCtrl.pop();
  }

}