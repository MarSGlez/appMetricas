import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { JsonSQLite } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Storage } from '@capacitor/storage';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  dbReady = new BehaviorSubject(false);
  dbName = '';
  private storage: SQLiteObject;
  songsList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

 constructor(private http: HttpClient, private alertCtrl: AlertController, private sqlPorter: SQLitePorter , private platform: Platform,private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'positronx_db.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });

  }
             
  getFakeData() {
   this.http.get('assets/dump.sql', { responseType: 'text' }).subscribe((data) => {
      this.sqlPorter.importSqlToDb(this.storage, data).then((_) => {
          //this.getSongs();
          this.isDbReady.next(true);
        }).catch((error) => console.error(error));
    });
  }
}
