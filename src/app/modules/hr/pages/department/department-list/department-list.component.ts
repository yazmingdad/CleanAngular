import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { DepartmentCard } from 'src/app/data/schema/department';
import { departments } from 'src/app/data/service/fake.data';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { media } from 'src/app/shared/utility/media';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  providers: [DepartmentService],
})
export class DepartmentListComponent {
  private medias = {
    sm$: media(`(max-width: 800px)`),
    lg$: media(`(min-width: 801px)`),
  };
  private subscriptions: Subscription[] = [];

  isLoading = true;

  get notFound() {
    return !this.departments || this.departments.length === 0;
  }

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private permissionService: PermissionService
  ) {
    this.subscriptions = [
      this.medias.sm$.subscribe(() => {
        this.departmentService.setPageSize(2);
      }),
      this.medias.lg$.subscribe(() => {
        this.departmentService.setPageSize(7);
      }),
      this.departmentService.loading$.subscribe((loading) => {
        this.isLoading = loading;
      }),
      this.departmentService.page$.subscribe({
        next: (departments) => {
          //this.isLoading = false;
          this.departments = departments;
          console.log('departments', departments);
        },
        error: () => {},
      }),
      this.route.params.subscribe(({ nature }) => {
        if (nature === 'Central') {
          //this.isRetired = true;
        } else {
          //this.isRetired = false;
        }
        // this.isLoading = true;
        this.departmentService.load();
      }),
    ];
  }

  departments: DepartmentCard[] = departments;
}
