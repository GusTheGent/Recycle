import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PickupCallPageRoutingModule } from './pickup-call-routing.module';

import { PickupCallPage } from './pickup-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PickupCallPageRoutingModule,
  ],
  declarations: [PickupCallPage],
})
export class PickupCallPageModule {}
