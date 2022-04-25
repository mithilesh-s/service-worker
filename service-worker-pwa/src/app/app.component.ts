import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/internal/observable/interval';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'service-worker-pwa';
  userData:any
  readonly VAPID_PUBLIC_KEY ="BFQlxmYuBem5dISG9Pz2EwEz0knqI1j43I-6EUZ743WoeTHzDjTDU89wDvs8whoEXibnprLXz3DvGSrlhcwQe0A"

  constructor(
    private http:HttpClient,
    private sw: UpdateService,
    private swPush: SwPush
    // private update: SwUpdate,
    // private appRef: ApplicationRef,
    // private  swUpdate:SwUpdate
    ){
      this.sw.checkForUpdates();
    }
  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(res=>{
      this.userData=res;
    })



    
  }


  subscribeToNotification(){
   if (this.swPush.isEnabled) {

      this.swPush.requestSubscription({

        serverPublicKey: this.VAPID_PUBLIC_KEY

      })

      .then(sub => {

        console.log(sub);

       

        this.sw.postSubscription(sub).subscribe(res=>console.log(res)

        );

      })

      .catch(console.error);

    }

  }
  }



