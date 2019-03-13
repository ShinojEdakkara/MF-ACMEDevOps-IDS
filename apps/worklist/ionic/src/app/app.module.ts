import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DataStore } from './dataStore';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LandingPage } from "../pages/landing/landing";
import { WorklistPage } from "../pages/Worklist/Worklist";
import { CreateModalPage } from "../componentScripts/listViewCreateModal";
import { DetailModalPage } from "../componentScripts/listViewDetailModal";
import { SearchModalPage } from "../componentScripts/listViewSearchModal";
import { ChatPage } from "../pages/Chat/Chat";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ,LandingPage,WorklistPage,CreateModalPage,DetailModalPage,SearchModalPage,ChatPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ,LandingPage,WorklistPage,CreateModalPage,DetailModalPage,SearchModalPage,ChatPage],
  providers: [
    StatusBar,
    SplashScreen,
    DataStore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
