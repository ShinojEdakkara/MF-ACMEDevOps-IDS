import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import ListViewComponent from './listView';

@Component({
  template: `
  <ion-header>
 <ion-toolbar>
   <ion-title>
     Create
   </ion-title>
   <ion-buttons start>
     <button ion-button (click)="dismiss()">
       <ion-icon name="md-close"></ion-icon>
     </button>
   </ion-buttons>
 </ion-toolbar>
</ion-header>
  <ion-content padding>
    <div *ngFor="let form of formItems; let i = index;" style="width:100%">
      <div *ngIf="form.show"  style="width:100%">
        <ion-item *ngIf="form.type != 'boolean'">
          <ion-label color="primary" floating>{{form.displayname}}</ion-label>
          <ion-input type="form.type" [(ngModel)]="form.value" ></ion-input>
        </ion-item>
        <ion-item *ngIf="form.type == 'boolean'">
          <ion-label>{{form.displayname}}</ion-label>
          <ion-checkbox [(ngModel)]="form.value"></ion-checkbox>
        </ion-item>
      </div>
    </div>
    <div style="display:flex;flex-direction:row-reverse;margin-top:1em;width:100%">
      <ion-spinner name="bubbles" [hidden]="submitting"></ion-spinner>
      <button style="text-align:right;" ion-button (click)="submitForm()">{{formSubmit}}</button>
    </div>
  
  </ion-content>
  `,
})
export class CreateModalPage {

  submitting = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.formItems = navParams.get('formItems');
    this.formItems.map((formItem) => {
      if (formItem.type === 'text') {
        formItem.value = '';
      } else if (formItem.type === 'number') {
        formItem.value = 0;
      }
    });
    this.adapterPath = navParams.get('adapterPath');
    this.baseurl = navParams.get('baseurl');
  }

  listViewComponent = new ListViewComponent();
  formItems = [];
  formSubmit = "Create";
  adapterPath = '';
  baseurl = '';


  submitForm() {
    this.submitting = false;
    this.listViewComponent.callAPI(this.baseurl, WLResourceRequest.POST, this.adapterPath, this.formItems, (err, res) => {
      this.submitting = true;
      this.viewCtrl.dismiss();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
