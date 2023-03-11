import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() error: string = '';
  @Input() field: FormGroup;

  constructor() {}

  ngOnInit() {}

  showMessage(): boolean {
    if (this.field?.touched && this.field?.errors?.[this.error]) {
      return true;
    }
    return false;
  }
}
