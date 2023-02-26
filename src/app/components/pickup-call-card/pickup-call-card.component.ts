import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent implements OnInit {
  @Input() showHeader: boolean = true;
  @Input() showButton: boolean = true;
  @Input() status!: string;
  @Input() createdOn!: string;
  @Input() updatedOn!: string;
  @Input() notes!: string;
  @Input() earnings!: number;
  constructor() {}

  ngOnInit() {}
}
