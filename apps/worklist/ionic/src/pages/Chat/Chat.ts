import { Component,Renderer,NgZone } from '@angular/core';
import { NavController,ModalController, LoadingController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import WatsonChat from "../../componentScripts/chat";
import { Platform } from "ionic-angular";

@Component({
  selector: 'page-Chat',
  templateUrl: 'Chat.html'
})
export class ChatPage {

  constructor(public navCtrl: NavController, public dataStore:DataStore, renderer: Renderer, private zone: NgZone, public platform: Platform) {
      this.watsonChat.init(this.url,this.iam_apikey,this.workspaceId,eval('this.shouldSendWatsonAssistantAnalytics'));
      platform.ready().then(() => {this.message()});

  }

    messages = [];
    input: any;
    watsonChat = new WatsonChat();

    message() {
        this.watsonChat.sendMessage(this.messages, this.input,(err,msgs)=>{ this.zone.run(() => { this.messages = msgs; }); });this.input='';
    }

    url = "https://gateway-wdc.watsonplatform.net/assistant/api";
    iam_apikey = "H-laQwn1WZ8463qp4T_yRUOhHDzV3i_xeCr5rsmQN-df";
    workspaceId = "ec33c0cf-a857-4ea1-9ab8-f28fb8054046";
    shouldSendWatsonAssistantAnalytics = true;
}