import { Component } from '@angular/core';
import { ConfigService, keyConfig } from './services/config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private configService: ConfigService) {
    this.initApp()
  }

  async initApp(){
    const color_scheme_dark = await this.configService.find(keyConfig.COLOR_SCHEME_DARK);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

    const matchesDark = color_scheme_dark === null ? prefersDark.matches : color_scheme_dark
    const matchesLight = color_scheme_dark === null ? prefersLight.matches : !color_scheme_dark


    document.body.classList.toggle('dark', matchesDark);
    document.body.classList.toggle('light', matchesLight);
  }
}
