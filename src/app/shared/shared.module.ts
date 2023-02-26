// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
//COMPONENTS
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';

@NgModule({
  declarations: [PickupCallCardComponent],
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  exports: [PickupCallCardComponent, TranslateModule],
})
export class SharedModule {}
