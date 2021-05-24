import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-templatedriven-form',
  templateUrl: './templatedriven-form.component.html',
  styleUrls: ['./templatedriven-form.component.css']
})
export class TemplatedrivenFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  roles = ['Admin', 'User',
  'Supervisor'];

//model = new Hero(18, 'Dr IQ', this.roles[0], 'durga@gmail.com');
model = new Hero(0,'','','');
submitted = false;

onSubmit() { this.submitted = true; 
console.log("model:: ",this.model);}

newHero() {
this.model = new Hero(42, '', '','');
}
}


