import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticTacToe';

 //nga eventi
  @Input() values!: any;
  //nga boardi
  @Input() logs!: any[];

/**
 * Funksioni qe merr vektorin me logs nga komponenti boards kur klikohet nje kuti
 * @param event - mban vektorin e logs
 */
  getBoard(event: any){
    this.logs=event;
  }
/**
 * Funksioni qe merr vlerat e perdourseit nga komponenti welcome
 * @param event - mban vektorin e vlerat e marra nga fushat e inputeve
 */
  getValues(event: any){
    this.values=event;
  }
}
