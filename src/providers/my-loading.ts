import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * MYLoading
 * 
 * Classe de manipulação do loading
 * 
 * @author William Oliveira
 * @since 09/2017
 */
@Injectable()
export class MYLoading extends LoadingController {

	/**
	 * is_running
	 * 
	 * @public
	 * @type {boolean}
	 */
	public is_running: boolean = false;

	/**
	 * is_running
	 * 
	 * @public
	 * @type {Object}
	 */
	public loading;


	/**
	 * show
	 * 
	 * exibe o loading
	 * 
	 * @public
	 * @author William Oliveira
	 * @since 09/2017
	 * @param {string} text o texto a ser exibido no login
	 * @return {Promise<boolean>} ações a serem executas após o loading ser exibido
	 */
	public show(text: string = 'Carregando'): Promise<boolean> {

		// verifica se a animção ja esta acontecendo
		if (!this.is_running) {

			// seta o loading
			this.loading = this.create({ content: text });

			// indica o inicio do loading
			this.is_running = true;

			// exibe o loading
			return this.loading.present();

			// caso ja esteja rodando, volta a nova Promise
		} else return new Promise((resolve, reject) => { resolve(true); });
	}

	/**
	 * hide
	 * 
	 * esconde o loading
	 * 
	 * @public
	 * @author William Oliveira
	 * @since 09/2017
	 */
	public hide(): void {

		// verifica se o loading esta sendo exibido
		if (this.is_running) {
			this.is_running = false;
			this.loading.dismiss();
		}
	}
}
