import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class WebsocketService {

  constructor(private socket: Socket) { }

  public sendMessage(message: any) {
    let data = { userId: "", message: message, }
    this.socket.emit('new-message', data);

  }
  public getMessages = () => {
    return Observable.create((Observer: any) => {
      this.socket.on('new-message', (message: any) => {
        console.log(message, 'from get message');

        Observer.next(message);
      });
    });
  }
}
