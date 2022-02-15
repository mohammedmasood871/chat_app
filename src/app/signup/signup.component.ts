import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, AbstractControl,FormBuilder, Validators} from '@angular/forms'
import { ApiServiceService } from '../service/api-service.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm !: FormGroup
  errorMessage:string =''
  constructor(private fb : FormBuilder, private apiService: ApiServiceService, private route : Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])


    })
  }
  onSubmit(){
    console.log(this.signupForm)
      this.apiService.signUp(this.signupForm.value).subscribe( (res:any) =>{ 
        if(res.StatusCode == 200){
          this.route.navigate([''])

        }else{
          this.errorMessage = res.message
        }    

      }, err =>{
        console.log(err)

      })
    
    
  }
}
