import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EventComponent } from './events/event.component';

import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    WelcomeComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
