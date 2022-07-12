import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [
  {path:"welcome", component: WelcomeComponent},
  {path:"board", component: BoardComponent},
  {path:'', redirectTo:"welcome", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
