import { Component, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/data/schema/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user: ApplicationUser;
}
