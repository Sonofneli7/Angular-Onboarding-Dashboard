import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from "./tabs/tabs.component";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Fixed plural form
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ background: 'green' }),
        animate(1000),
      ]),
    ]),
  ],
})
export class AppComponent {
  // Method to prepare route transitions
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
