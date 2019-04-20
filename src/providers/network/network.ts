import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

// provider code originated from https://forum.ionicframework.com/t/ionic-3-network-connectivity-check-how-to-implement-for-all-pages-components/122677

export enum ConnectionStatusEnum {
    Online,
    Offline
}


@Injectable()
export class NetworkProvider {

  previousStatus;

    constructor(public alertCtrl: AlertController,
                public network: Network,
                public eventCtrl: Events) {

      this.previousStatus = ConnectionStatusEnum.Online;

    }

    public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
                this.presetOnlineAlert();
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        });
    }

    async presetOnlineAlert() {
        let alert = await this.alertCtrl.create({
            title: 'Device is now Online',
            subTitle: 'Synchronization Available',
            buttons: ['OK']
        });
        await alert.present();
    }

}
