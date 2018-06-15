import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NovaNotaPage } from '../nova-nota/nova-nota';
import * as firebase from 'Firebase';
import { EditNotaPage } from '../edit-nota/edit-nota';
import { EditarNotaPage } from '../editar-nota/editar-nota';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  notas = [];
  nota = [];
  ref = firebase.database().ref('notas/');
  user:string;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user") as string;
    
    this.ref.on('value', resp => {
      this.nota = [];
      this.nota = snapshotToArray(resp);
      let u = 0;
      for (let i = 0; i < this.nota.length; i++) {
        if((this.nota[i]['user'] === this.user)){
          this.notas[u] = this.nota[i];
          u++;
        }
      }
  });

}

  addNota() {
    this.navCtrl.push(NovaNotaPage, {
      user:this.navParams.get("user")
    });
  }

  abrirNota(key) {
    this.navCtrl.push(EditNotaPage, {
      key:key
    });
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Olá, ${this.user}!`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};