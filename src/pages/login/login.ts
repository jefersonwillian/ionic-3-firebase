import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MYLoading } from '../../providers/my-loading';
import { Storage } from '@ionic/storage';

@IonicPage({
	name: 'login'
})
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	loginForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public formbuilder: FormBuilder,
		public afAuth: AngularFireAuth,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public loading: MYLoading,
		private storage: Storage
		) {
		this.loginForm = this.formbuilder.group({
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.minLength(6)]]
		})
	}

	ionViewCanEnter(){
		this.storage.get('user')
		.then((resolve) =>{
			if(resolve.length > 0){
				this.navCtrl.setRoot('start-page');
			}else{
				return true;
			}
		})
		.catch((error) =>{
			return true;
		})
	}

	submitLogin() {
		this.loading.show('Carregando . . .');
		this.afAuth.auth.signInWithEmailAndPassword(
			this.loginForm.value.email, this.loginForm.value.password)
		.then((response) => {
			console.log('response ', response);
			this.storage.set('user', response.user.uid)
			.then(() => {
				this.navCtrl.setRoot('start-page');
			})
		})
		.catch((error) => {			
			if (error.code == 'auth/wrong-password') {
				this.showAlert('Erro ao logar', 'Senha incorreta');
				this.loginForm.controls['password'].setValue(null);
			} else {
				this.showAlert('Erro ao logar', 'Não foi possivel realizar seu login');
				this.loginForm.controls['password'].setValue(null);
			}
		})
		this.loading.hide();
	}

	showAlert(title: string, msg: string) {
		const alert = this.alertCtrl.create({
			title: title,
			subTitle: msg,
			buttons: ['OK']
		});
		alert.present();
	}
}
