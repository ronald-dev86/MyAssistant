import { Component, OnInit } from '@angular/core';
import { ConfigService, keyConfig } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  themeToggle:boolean = false;

  constructor(private configService: ConfigService) { }

  async ngOnInit() {
    const color_scheme_dark = await this.configService.find(keyConfig.COLOR_SCHEME_DARK);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    if (color_scheme_dark === undefined) {
      console.log(prefersDark.matches)
      await this.configService.add({ key: keyConfig.COLOR_SCHEME_DARK, value: prefersDark.matches })
    }

    if (color_scheme_dark === undefined || color_scheme_dark === prefersDark.matches ) {
      this.initializeDarkTheme(prefersDark.matches);
    }

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
    prefersLight.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));

  }
  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark: any) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev:any) {
    this.toggleDarkTheme(ev.detail.checked);

  }

  // Add or remove the "dark" class on the document body
  async toggleDarkTheme(shouldAdd:any) {
    await this.configService.add({ key: keyConfig.COLOR_SCHEME_DARK, value: shouldAdd })
    document.body.classList.toggle('dark', shouldAdd);
    document.body.classList.toggle('light', !shouldAdd);
  }
}
