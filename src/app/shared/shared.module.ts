// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
//COMPONENTS
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

const components = [PickupCallCardComponent, ErrorMessageComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  exports: [components, TranslateModule],
})
export class SharedModule {}
