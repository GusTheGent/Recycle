import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent implements OnInit {
  @Input() showHeader: boolean = true;
  @Input() showButton: boolean = true;
  @Input() status: string;
  @Input() createdOn: string;
  @Input() updatedOn: string;
  @Input() notes: string;
  @Input() earnings: number;
  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onSeeAll() {
    this.clickEvent.emit();
  }
}
