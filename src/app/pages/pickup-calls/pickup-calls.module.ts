import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PickupCallsPageRoutingModule } from './pickup-calls-routing.module';

import { PickupCallsPage } from './pickup-calls.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PickupCallsPageRoutingModule,
    SharedModule,
  ],
  declarations: [PickupCallsPage],
})
export class PickupCallsPageModule {}
