import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userArray: any = []
  userId: any = ""
  chatView: boolean = false
  sessionUserId:any =""
  constructor(private apiservice: ApiServiceService, private route: Router) { }

  ngOnInit(): void {
    const authToken = localStorage.getItem("authToken")
    const sessionToken = localStorage.getItem("sessionToken")
    const isAlreadyLoggedIn = !!authToken && !!sessionToken
    const sessionId = localStorage.getItem("sessionId")
    const userdetail = btoa(`${sessionId}`)
  this.sessionUserId = userdetail    
    if (!isAlreadyLoggedIn) {
      this.route.navigate([""])
    }
    this.userList()
  }
  userList() {
    this.apiservice.userList(this.sessionUserId).subscribe(res => {
      console.log(res)
      this.userArray = res
    })
  }

  getUser(event: any) {
    console.log(event)
    this.userId = event
    this.chatView = true


  }
}
