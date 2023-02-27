import { Employee } from 'src/app/data/schema/employee';
import { Paginator } from 'src/app/shared/utility/paginator';

export class EmployeePaginator extends Paginator<Employee> {
  search(query: string): Employee[] {
    return (this.currentList = this.list.filter((e) => {
      return (
        e.fullName.includes(query) ||
        e.department.includes(query) ||
        e.rank.includes(query) ||
        e.cardNumber.includes(query) ||
        e.ssn.includes(query)
      );
    }));
  }
}
