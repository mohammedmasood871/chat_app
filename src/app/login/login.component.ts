




















import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ApiServiceService } from '../service/api-service.service';



@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  submitted: boolean = false

  errorMessage: any = ""

  constructor(private fb: FormBuilder, private apiService: ApiServiceService, public route: Router) { }



  ngOnInit(): void {

    const authToken = localStorage.getItem("authToken")

    const sessionToken = localStorage.getItem("sessionToken")


    const isAlreadyLoggedIn = !!authToken && !!sessionToken

    if (isAlreadyLoggedIn) {

      this.route.navigate(["/dashboard"])

    }

    this.loginForm = this.fb.group({

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl(' ', [Validators.required])

    })



  }



  onSubmit() {

    this.apiService.login(this.loginForm.value).subscribe((res: any) => {

      if (res.StatusCode == 200) {

        console.log(res, 'res')

        const authToken = res?.authtoken

        const sessionToken = atob(res?.docs?.username)
        var sessionId = atob(res?.docs?._id)
        localStorage.setItem("authToken", authToken)

        localStorage.setItem("sessionToken", sessionToken)
        localStorage.setItem("sessionId", sessionId)


        this.route.navigate(['/dashboard'])

      } else {

        this.errorMessage = res.message

      }



    }, err => {

      throw err

    })





  }







}

