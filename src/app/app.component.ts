import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'atipera-app';
  showFiller = false;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|pl/) ? browserLang : 'pl');
  }
}
