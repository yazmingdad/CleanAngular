import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationUser, Role, UserRole } from 'src/app/data/schema/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user: ApplicationUser;

  @Output() addRole = new EventEmitter<UserRole>();
  @Output() removeRole = new EventEmitter<UserRole>();
  @Output() disableUser = new EventEmitter<string>();
  @Output() resetPassword = new EventEmitter<string>();

  onEditRole(role: Role) {
    if (role.isEnabled) {
      this.removeRole.emit({
        userId: this.user.id,
        roleName: role.name,
      });
    } else {
      this.addRole.emit({
        userId: this.user.id,
        roleName: role.name,
      });
    }
  }

  onDisable() {
    if (this.user.userName.toLowerCase() !== 'cleaner') {
      this.disableUser.emit(this.user.id);
    }
  }

  onReset() {
    if (this.user.userName.toLowerCase() !== 'cleaner') {
      this.resetPassword.emit(this.user.id);
    }
  }
}
