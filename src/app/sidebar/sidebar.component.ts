import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public sidebarOptions = [
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    },
    {
      icon: `<span class="material-icons">
      dashboard
      </span>`, route: "/"
    },
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    },
    {
      icon: "home", route: "/"
    },
    
   
  ]


}
