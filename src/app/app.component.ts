import { Component } from '@angular/core';
import{CommonModule} from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsComponent } from "./tabs/tabs.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabsComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-onboarding-dashboard';
}
