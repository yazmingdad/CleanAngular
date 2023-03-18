export interface MenuItem {
  index?: number;
  route?: string;
  name: string;
  icon: string;
  color: string;
  menuItems?: MenuItem[];
}

export const modules: MenuItem[] = [
  {
    index: 1,
    name: 'Human Resources',
    icon: 'fas fa-sitemap',
    color: 'bg-danger',
    menuItems: [
      {
        route: '/hr/employee/up',
        name: 'Active Employees',
        icon: 'fas fa-user-check',
        color: 'bg-success',
      },
      {
        route: '/hr/employee/down',
        name: 'Retired Employees',
        icon: 'fas fa-user-check',
        color: 'bg-danger',
      },
    ],
  },
  {
    index: 2,
    name: 'User Management',
    icon: 'fas fa-sitemap',
    color: 'bg-danger',
    menuItems: [
      {
        route: '/hr/employee/up',
        name: 'Active Employees',
        icon: 'fas fa-user-check',
        color: 'bg-success',
      },
      {
        route: '/hr/employee/down',
        name: 'Retired Employees',
        icon: 'fas fa-user-check',
        color: 'bg-danger',
      },
    ],
  },
];
