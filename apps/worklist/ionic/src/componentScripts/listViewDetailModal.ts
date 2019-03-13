import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import ListViewComponent from './listView';

@Component({
  template: `
  <ion-header>
    <ion-toolbar>
      
      <ion-title *ngIf="showPage === 'view'">
        Details
      </ion-title>
      <ion-title *ngIf="showPage === 'edit'">
        Edit
      </ion-title>
      <ion-title *ngIf="showPage === 'add'">
        Add
      </ion-title>

      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <ion-icon name="md-close"></ion-icon>
        </button>
      </ion-buttons>
    </ion-toolbar>
</ion-header>
  <ion-content padding class="listDetailsHolder" *ngIf="showPage === 'view'">
    <div class="content">  
      <h1 class="viewTitle">{{getDisplayValue()}}</h1>

      <div *ngFor="let form of formItems; let i = index;">
        <ion-item *ngIf="form.show === 'show'">
          <h2>{{form.displayname}}</h2>
          <p>{{form.value}}</p>
        </ion-item>
      </div>
    </div>
    <div class="actionButtons">
      <button ion-button icon-start block (click)="editActionClick()" *ngIf="checkPermission('edit')">
        <ion-icon name="create"></ion-icon>Edit
      </button>
      <button ion-button icon-start block (click)="showDeleteConfirm()" *ngIf="checkPermission('delete')">
        <ion-icon name="trash"></ion-icon>Delete
      </button>
    </div>  
  </ion-content>
  <ion-content padding class="listDetailsHolder" *ngIf="showPage !== 'view'">
    <div class="content">  
      <div *ngFor="let form of formItems; let i = index;" style="width:100%">
        <div *ngIf="form.show === 'show' || form.show === 'edit'"  style="width:100%">
          <ion-item *ngIf="showPage === 'edit' && form.show === 'show'">
            <h2>{{form.displayname}}</h2>
            <p>{{form.value}}</p>
          </ion-item>
          <ion-item *ngIf="(form.show === 'edit' || (showPage === 'add' && form.show === 'show')) && form.type != 'boolean'">
            <ion-label color="primary" floating>{{form.displayname}}</ion-label>
            <ion-input type="form.type" [(ngModel)]="form.value" ></ion-input>
          </ion-item>
          <ion-item *ngIf="(form.show === 'edit' || (showPage === 'add' && form.show === 'show')) && form.type == 'boolean'">
            <ion-label>{{form.displayname}}</ion-label>
            <ion-checkbox [(ngModel)]="form.value"></ion-checkbox>
          </ion-item>

        </div>
      </div>
    </div>
    <div class="actionButtons">
      <button ion-button icon-start block (click)="saveActionClick()" >Save
      </button>
      <button ion-button icon-start block (click)="editCancelActionClick()" *ngIf="showPage === 'edit'">Cancel
      </button>
    </div>
  </ion-content>
  `,
})
export class DetailModalPage {
  
  constructor(public navCtrl: NavController, 
    private zone: NgZone, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) 
    {
    this.postPathURL = navParams.get('postPathURL');
    this.viewPathURL = navParams.get('viewPathURL');
    this.editPathURL = navParams.get('editPathURL');
    this.deletePathURL = navParams.get('deletePathURL');
    this.baseurl = navParams.get('baseurl');    
    this.addAttributes = navParams.get('addAttributes');
    this.viewAttributes = navParams.get('viewAttributes');
    this.editAttributes = navParams.get('editAttributes');
    this.viewItem = navParams.get('viewItem');
    this.viewTitle = navParams.get('viewTitle');
    this.showPage = navParams.get('showPage');
    
    if(this.showPage === 'view') {
      this.getViewFormComponents();
    } else {
      this.getAddFormComponents();
    }
  }

  listViewComponent = new ListViewComponent();
  postPathURL = '';
  viewPathURL = '';
  editPathURL = '';
  deletePathURL = '';
  baseurl = '';
  showPage = 'view';
  addAttributes = [];
  viewAttributes = [];
  editAttributes = [];
  viewItem = {};
  formItems = [];  
  viewTitle=[];
  
  getAddFormComponents() {
    this.formItems = this.listViewComponent.getDetailAttributesList({}, this.addAttributes);
  }
  getViewFormComponents() {
    this.formItems = this.listViewComponent.getDetailAttributesList(this.viewItem, this.viewAttributes);
  }
  getEditFormComponents() {
    this.formItems = this.listViewComponent.getDetailAttributesList(this.viewItem, this.editAttributes);
  }

  getDisplayValue() {
    return this.listViewComponent.getDisplayValue(this.viewItem, this.viewTitle);
  }

  editActionClick(){
    this.showPage = 'edit';
    this.getEditFormComponents();    
  }

  showDeleteConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Delete item?',
      message: 'Once deleted, the item cannot be recovered. Do you want to continue?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            let loader = this.loadingCtrl.create({});
            loader.present();
            this.listViewComponent.callAPI(this.baseurl, WLResourceRequest.DELETE, this.deletePathURL, this.formItems, (err, res) => {
              loader.dismiss();
              this.viewCtrl.dismiss();
            });        
          }
        }
      ]
    });
    confirm.present();
  }

  editCancelActionClick() {
    this.showPage = 'view';
    this.getViewFormComponents();    
  }

  saveActionClick() {
    let loader = this.loadingCtrl.create({});
    loader.present();
    
    if(this.showPage === 'edit') {
      this.listViewComponent.callAPI(this.baseurl, WLResourceRequest.PUT, this.editPathURL, this.formItems, (err, response) => {
        this.zone.run(() => { 
          loader.dismiss();
          // this.viewItem = JSON.parse(response);
          // this.showPage = 'view';
          // this.getViewFormComponents();
          this.viewCtrl.dismiss();
        });      
      });
    } else {
      this.listViewComponent.callAPI(this.baseurl, WLResourceRequest.POST, this.postPathURL, this.formItems, (err, response) => {
        this.zone.run(() => { 
          loader.dismiss();
          // this.viewItem = JSON.parse(response);
          // this.showPage = 'view';
          // this.getViewFormComponents();
          this.viewCtrl.dismiss();
        });
      });
    }
  }

  checkPermission(actionType) {
    if(actionType === 'delete') {
        if(this.deletePathURL) {
            return true;
        }
    } else if(actionType === 'edit') {
        if(this.editPathURL) {
            return true;
        }
    }

    return false;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
