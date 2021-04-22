import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'anguarMaterial1';
  currentRoute: any;
  showMCCreatePage: any;
  loggedInUser:any;
  responseEmittedFromChildComponent: any;

  constructor(private router: Router,private route: ActivatedRoute ) {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        console.log("currentRoute ::",this.router.url); 
        this.currentRoute = this.router.url;
      }
    })   
  }

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem("loggedInUsername");
  }
  
  logOutProfile(){
    localStorage.removeItem("loggedInUsername");
    this.router.navigate(["/login"]);
  }
  
  
  
}
