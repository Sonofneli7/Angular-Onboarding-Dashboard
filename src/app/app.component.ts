import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsComponent } from "./tabs/tabs.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabsComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-onboarding-dashboard';
}
