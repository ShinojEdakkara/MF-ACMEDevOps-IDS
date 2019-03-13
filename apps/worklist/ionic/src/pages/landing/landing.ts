import { Component,Renderer,NgZone } from '@angular/core';
import { NavController,ModalController, LoadingController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { WorklistPage } from "../Worklist/Worklist";
import { ChatPage } from "../Chat/Chat";

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public dataStore:DataStore) {

  }

    landing_Button_5547_clickHandler() {
        this.navCtrl.push( WorklistPage, {
                data: {"a":"a"}
              });
    }

    landing_Button_949_clickHandler() {
        this.navCtrl.push( ChatPage, {
                data: {"a":"a"}
              });
    }
}