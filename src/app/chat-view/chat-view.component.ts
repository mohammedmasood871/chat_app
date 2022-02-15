import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { WebsocketService } from '../service/websocket.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  @Input() user: any
  userdetail: any
  newMessage!: string;
  messageList: any[] ;
  userId: any = ''

  constructor(private apiservice: ApiServiceService, private chatService: WebsocketService,) { 
    this.messageList = []
  }

  ngOnInit(): void {
    const sessionId = localStorage.getItem("sessionId")
    const userdetail = btoa(`${sessionId}`)
    this.userId = userdetail
    // user detail
    this.apiservice.chatUser(this.user).subscribe(res => {
      this.userdetail = res
    })
    // user detail eend

    //  get data from socket
    this.getChatData()
    this.chatService
      .getMessages()
      .subscribe((message: any) => {

        this.messageList?.push(message?.message)





      });
    //  get data from socket end

  }

  sendMessage() {
    let chatData = {
      senderId: this.userId,
      message: this.newMessage,
      recevierId: this.user,
      read: false

    }

    this.chatService.sendMessage(chatData)
    this.apiservice.chatData(chatData).subscribe((res: any) => {
      console.log(res)
    }, err => {
      throw err
    })
    this.newMessage = ''

  }

  getChatData() {
    this.apiservice.chatGetData(this.userId, this.user).subscribe((res: any) => {
      this.messageList = res?.data?.chatArray ?? [];
      console.log(this.messageList);

    })
  }
}
