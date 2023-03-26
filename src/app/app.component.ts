import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  supportedLanguages: string[] = ['en', 'gr'];

  appPages: ISideMenuItem[] = [
    {
      title: this.translateService.instant('SIDE_MENU.ITEMS.MY_CALLS'),
      url: 'pickup-calls',
      icon: 'albums',
    },
    {
      title: this.translateService.instant('SIDE_MENU.ITEMS.NEW_CALL'),
      url: 'pickup-call',
      icon: 'add-circle',
    },
  ];
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.supportedLanguages);
  }

  selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}

interface ISideMenuItem {
  title: string;
  url: string;
  icon: string;
}
