import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import ListViewComponent from './listView';

@Component({
  template: `
  <ion-header>
    <ion-toolbar>
      
      <ion-title>
        Search
      </ion-title>

      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <ion-icon name="md-close"></ion-icon>
        </button>
      </ion-buttons>
    </ion-toolbar>
</ion-header>
  <ion-content padding class="listDetailsHolder">
    <div class="content">
      <div *ngFor="let form of formItems; let i = index;" style="width:100%">
        <div style="width:100%">
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
    </div>
    <div class="actionButtons">
      <button ion-button block (click)="cancelActionClick()">Cancel</button>
      <button ion-button block (click)="searchActionClick()" >Search</button>
    </div>
  </ion-content>
  `,
})
export class SearchModalPage {
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController) 
    {
    this.searchAttributes = navParams.get('searchAttributes');
    
    this.getSearchFormComponents();
  }

  listViewComponent = new ListViewComponent();
  searchAttributes = [];
  formItems = [];  
  
  getSearchFormComponents() {
    this.formItems = this.listViewComponent.getDetailAttributesList({}, this.searchAttributes);
  }

  cancelActionClick() {
    this.viewCtrl.dismiss();
  }

  searchActionClick() {
    this.viewCtrl.dismiss(this.formItems);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
