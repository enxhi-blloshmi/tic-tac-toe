import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares!: string[];
  logs!: any[];
  xTurn!:boolean;
  winner!: any;
  squaresFilled!: number;
  nameToBeSend!: string;

  userInput: any;
  
  //dergon logs tek eventi
  @Output() board: EventEmitter<string[]> = new EventEmitter<string[]>();
  //dergon tek square nese boardi duhet te jete i paeditueshem
  @Output () disableBoard!:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:any)=> {
      this.userInput=params;
    })

    this.validation();
  }

  /**
   * Funksioni qe kontrollon nese perdoruesi ka futur te dhena per nisjen e lojes
   */
  validation(){
    if(this.userInput.players ==1 && this.userInput.firstName)
    this.startGame();

    else if(this.userInput.players ==2 && this.userInput.firstName && this.userInput.secondName)
    this.startGame();

    else{
      alert("Ju nuk plotesuat fushat e kerkuara!\n Lutemi te plotesoni fushat dhe shtypni perseri 'Start' :) .");
      this.route.navigate(['/welcome']);
    }
  }
  /**
   * Funksioni qe nis lojen
   */
  startGame(){
    this.squares = Array(9).fill(null);
    this.logs = Array(0).fill(null); 
    this.xTurn = true;
    this.winner=null;
    this.squaresFilled=0;
    this.disableBoard=false;
  }

  /**
   * Funksion qe kthen nese levizja do jete x apo o
   */
  get whatState(){
    return this.xTurn? 'x':'o';
  }

  /**
   * Funksioni qe ekzekutohet ne momentin qe klikohet nje katror
   * @param index - indeksi i katrorit te klikuar
   */
  clicked(index: number){

    //klikohet nje katror i cili eshte bosh
    if(!this.squares[index])
    {
      this.squaresFilled++;
      this.squares[index]=this.whatState;
      
      //per shfaqjen e emrit tek logs
      if(this.xTurn)
      this.nameToBeSend=this.userInput.firstName;
      else
      this.nameToBeSend=this.userInput.secondName;

      this.logs.push({coordinate: index, state: this.squares[index], name: this.nameToBeSend});

      //dergon logs te eventi
      this.board.emit(this.logs)

      this.xTurn = !this.xTurn;
      this.winner=this.calculateWinner();

    
    //kur eshte vetem nje lojtar, pas levizjes se tij duhet te ekzekutohet levizja nga kompjuteri
    if(this.userInput.players==1 && !this.winner && this.squaresFilled<9)
        this.oneplayer(); 
  } 
         
}
  
  /**
   * Funksioni qe ekzekuton levizjen e kompjuterit
   */
  oneplayer(){

    let b: boolean = false;

    while(!b){

      let possibleMoveIndex=Math.floor(Math.random()*9);

      if(this.squares[possibleMoveIndex]==null){
        this.squaresFilled++;
        this.squares[possibleMoveIndex]=this.whatState;

        this.nameToBeSend="Computer";
        this.logs.push({coordinate: possibleMoveIndex, state: this.squares[possibleMoveIndex], name: this.nameToBeSend});
        this.board.emit(this.logs)
        
        this.xTurn=true;
        b=true;

        this.winner=this.calculateWinner();
      }

    }
  }

  /**
   * Funksioni qe ben perditesimin e board-it kur klikohen logs
   * @param event - mban te dhenat e marra nga komponentja event
   * 
   */
  newBoard(event: any){
    this.squares=event.nb;
    
    if(!this.winner && this.squaresFilled<9)
    this.disableBoard=event.disable;

  }

  /**
   * Funksioni qe llogarit cili eshte fituesi
   * @returns - Emrin e fituesit ose draw ne rast barazimi
   */
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {

      //winner x
    if(this.squares[a]=='x'){
      this.disableBoard=true;
      return this.userInput.firstName+" won"; 
    }

    //winner o
    else if(this.userInput.players==2 && this.squares[a]=='o'){
      this.disableBoard=true;
      return this.userInput.secondName+" won";
    }

    //winner computer
    else if(this.userInput.players==1 && this.squares[a]=='o'){
      this.disableBoard=true;
      return "Computer won";
      
    }
   }
  }
    //draw
    if(!this.winner && this.squaresFilled==9){
      this.disableBoard=true;
      return "DRAW";
    }
    return null;
  }

  /**
   * Funksioni qe kthen tek komponentja hyrese
   */
  goToWelcome(){
    this.route.navigate(['/welcome']);
  }
}
