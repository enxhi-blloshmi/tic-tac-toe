import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() logs!: any[];
  @Output() updateBoard: EventEmitter<any> = new EventEmitter<any>();

  disableBoard!:boolean;
 
  /**
   * Funksioni qe con vektorin me vlera qe duhet te kete boardi pasi eshte klikuar nje log
   * @param index - indeksi i logs-it te klikuar
   */
  display(index: number){

    let newBoard: string[]=Array(9).fill(null);

    for(let i=0; i<index+1; i++){
      newBoard[this.logs[i].coordinate]=this.logs[i].state;
    }    

    //per aq kohe sa nuk klikohet logsi i fundit boardi i lojes mbetet i bllokuar
    if(index+1<this.logs.length )
        this.disableBoard=true;

    //nese eshte klikuar logsi i fundit boardi duhet te jete i klikueshem
    else 
        this.disableBoard=false;

    this.updateBoard.emit({nb: newBoard, disable: this.disableBoard});
  }
}
