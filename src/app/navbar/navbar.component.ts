import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  public headerControls = [
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    }, {
      icon: "home", route: "/"
    },



  ]

  logOut(){
      localStorage.clear()
      this.route.navigate([''])
  }
}
