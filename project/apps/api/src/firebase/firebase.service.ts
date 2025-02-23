import { Inject, Injectable } from '@nestjs/common';
import { error } from 'console';
import admin, { app } from 'firebase-admin';
import { Database } from 'firebase-admin/lib/database/database';

@Injectable()
export class FirebaseRepository {
  db: Database;
  // #collection: FirebaseFirestore.CollectionReference;


  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    // this.#db = firebaseApp.database("https://shweywethla-49cb4-default-rtdb.asia-southeast1.firebasedatabase.app/");
    this.db = admin.app().database("https://shweywethla-49cb4-default-rtdb.asia-southeast1.firebasedatabase.app/")
  }

  setCoin(user:string,amount:number){
    const ref =  this.db.ref(`coin/${user}/`);
    ref.set(amount,(error)=>console.log("FIREBASE ERROR",error))
  }

  setCount(user:string,count:number,date:string){
    const ref = this.db.ref(`${date}/${user}/`);
    ref.once("value")
      .then(snapshot=>snapshot.val())
      .then(data=>{
        ref.set(data?parseInt(String(data))+1:1,(error)=>console.log("FIREBASE ERROR",error))
      })
    // ref.set(count,(error)=>console.log("FIREBASE ERROR",error))
  }
}