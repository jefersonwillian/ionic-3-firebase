import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { MYLoading } from '../../providers/my-loading';
import { AlertController } from 'ionic-angular';

@IonicPage({
	name: 'start-page'
})
@Component({
	selector: 'page-start',
	templateUrl: 'start.html',
})
export class StartPage {

	public uid: string;
	public task: string;
	public list: any[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		public db: AngularFireDatabase,
		public loading: MYLoading,
		public alertCtrl: AlertController
	) {
	}

	ionViewDidLoad() {

		//Recupera o ID do user que está salva na storage
		this.storage.get('user')
		.then((resolve) => {
			this.uid = resolve;
			this.getList();
		})
	}

	addTask(task: string) {
		this.loading.show('Salvando tarefa. . .');
		this.db.database.ref('/tasks').child(this.uid).push({
			task: task
		})
			.then(() => {
				this.showAlert('Sucesso', 'Sua tarefa foi salva com sucesso!', 'Ok');
				this.task = '';
			})
			.catch((error) => {
				this.showAlert('Error', 'Não foi possivel salvar sua tarefa', 'Voltar');
			})
		this.loading.hide();
	}

	showAlert(title: string, msg: string, button: string) {
		const alert = this.alertCtrl.create({
			title: title,
			subTitle: msg,
			buttons: [button]
		});
		alert.present();
	}

	getList() {
		let listDB = this.db.database.ref('/tasks').child(this.uid);
		listDB.on('value', (snapshot) => {
			const items = snapshot.val();
			if(items) {
				this.list = Object.keys(items).map(i => items[i]);
				console.log('this.list', this.list);
			}
		})
	}
}
