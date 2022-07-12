import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {


  selectValue!: number;
  name1!: string;
  name2!: string;
  @Output() values: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: Router
  ){}
  
  /**
   * Funksioni qe dergon vlerat qe jep perdoruesi ne komponenetet e tjera
   */
  sendValues(){
    this.route.navigate(['/board'],{queryParams:{players: this.selectValue, firstName: this.name1, secondName: this.name2}});
  }


}
