import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenScreenComponent } from './token-screen/token-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TokenScreenComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tokenProject';
}
