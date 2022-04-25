import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { catchError, interval, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public notificationURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(public updates: SwUpdate,private http:HttpClient) {
    if (updates.isEnabled) {
      interval(6000).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload()); 
  }


  postSubscription(sub: PushSubscription) {

 

 

    return this.http.post(this.notificationURL,sub).pipe(catchError(this.handlError));
  
  }
  
  handlError(error: { error: { message: any; }; }) {
  
    return throwError(error.error.message);
  
  }
}
