import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http: HttpClient) {
   

   }
  

   private baseUrl = "http://localhost:3000/";

  //  signup 

    signUp(data:any) {
      return this.http.post(this.baseUrl + 'register', data,)
    }

// login

    login(data:any){
      return this.http.post(this.baseUrl + 'login', data)
    }

    // userlist call
    userList(id:any) {
  
      return this.http.get(this.baseUrl + 'userlist/' + id, {
      })
    }
   
    // chat user

  chatUser(id:any) {
      return this.http.get(this.baseUrl + 'userfind/' + id)
    }
    
    // chat post call  
    chatData(data:any) {
      return this.http.post(this.baseUrl + 'chat', data)
    }

    // chat get call 
    
    chatGetData(sender:any,receiver:any ){
         return this.http.get(this.baseUrl + 'chatdata/' + sender +'/' + receiver)
    }
     
}
