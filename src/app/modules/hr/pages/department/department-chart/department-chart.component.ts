import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HCSankey from 'highcharts/modules/sankey';
import HCOrganization from 'highcharts/modules/organization';
import { ChartBranch, ChartNode } from 'src/app/core/models/chart';
import { media } from 'src/app/shared/utility/media';
import { Subscription } from 'rxjs';
import { Department, DepartmentType } from 'src/app/data/schema/department';

HCSankey(Highcharts);
HCOrganization(Highcharts);

@Component({
  selector: 'app-department-chart',
  templateUrl: './department-chart.component.html',
  styleUrls: ['./department-chart.component.css'],
})
export class DepartmentChartComponent {
  private medias = {
    sm$: media(`(max-width: 767px)`),
    lg$: media(`(min-width: 768px)`),
  };

  private data: ChartBranch[] = [
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '1', to: '4' },
    { from: '1', to: '5' },
    { from: '3', to: '8' },
    { from: '5', to: '6' },
    { from: '5', to: '7' },
  ];

  private departmentTypes: DepartmentType[] = [
    {
      id: 1,
      name: 'Central',
    },
    {
      id: 2,
      name: 'Regional',
    },
    {
      id: 3,
      name: 'Provincial',
    },
  ];

  legend = [
    {
      className: 'corporation',
    },
    {
      className: 'central',
    },
    {
      className: 'regional',
    },
    {
      className: 'provincial',
    },
  ];
  private departments: Department[] = [
    {
      id: 1,
      name: 'The Clean',
      shortName: 'Clean',
      departmentTypeId: 1,
      parentId: 1,
    },
    {
      id: 2,
      name: 'Human Resource',
      shortName: 'HR',
      departmentTypeId: 1,
      parentId: 1,
    },
    {
      id: 3,
      name: 'Marrakech Regional Department',
      shortName: 'MRD',
      departmentTypeId: 2,
      parentId: 1,
    },
    {
      id: 4,
      name: 'Finance',
      shortName: 'Fi',
      departmentTypeId: 1,
      parentId: 1,
    },
    {
      id: 5,
      name: 'Control & Supervision',
      shortName: 'C&S',
      departmentTypeId: 1,
      parentId: 1,
    },
    {
      id: 6,
      name: 'Product developers',
      shortName: 'PD',
      departmentTypeId: 3,
      parentId: 5,
    },
    {
      id: 7,
      name: 'Web devs, sys admin',
      shortName: 'WDSA',
      departmentTypeId: 3,
      parentId: 5,
    },
    {
      id: 8,
      name: 'Sales',
      shortName: 'SD',
      departmentTypeId: 3,
      parentId: 3,
    },
  ];

  private subscriptions: Subscription[] = [];

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  constructor() {
    this.subscriptions = [
      this.medias.sm$.subscribe(() => {
        const nodes = this.departments.map((d) => {
          return {
            id: d.id.toString(),
            name: d.shortName,
            color:
              d.id === d.parentId || !d.parentId
                ? '#a855f7'
                : this.getColor(d.departmentTypeId as number),
          };
        });
        this.chartOptions = this.getOptions(nodes, {
          height: 400,
          width: 400,
          inverted: false,
        });
      }),
      this.medias.lg$.subscribe(() => {
        const nodes = this.departments.map((d) => {
          return {
            id: d.id.toString(),
            name: d.name,
            color:
              d.id === d.parentId || !d.parentId
                ? '#a855f7'
                : this.getColor(d.departmentTypeId as number),
          };
        });
        this.chartOptions = this.getOptions(nodes, {
          height: 450,
          width: 769,
          inverted: true,
        });
      }),
    ];
  }

  private getColor(id: number): string {
    const type = this.departmentTypes.find(
      (t) => t.id === id
    ) as DepartmentType;

    switch (type.name) {
      case 'Central':
        return '#0F52BA';
      case 'Regional':
        return '#228B22';
      default:
        return '#FFAC1C';
    }
  }
  private getOptions(
    nodes: ChartNode[],
    chart: Highcharts.ChartOptions = {
      height: 450,
      width: 850,
      inverted: true,
    }
  ): Highcharts.Options {
    return {
      chart: chart,
      title: {
        text: '',
      },
      accessibility: {
        enabled: false,
      },
      series: [
        {
          type: 'organization',
          name: 'Department',
          keys: ['from', 'to'],
          data: this.data,
          levels: [
            {
              level: 0,
              color: '#191970',
              dataLabels: {
                color: 'white',
              },
            },
            {
              level: 1,
              //color: 'silver',
              dataLabels: {
                color: 'white',
              },
            },
            {
              level: 2,
              //color: '#980104',
            },
          ],
          nodes: nodes,
          colorByPoint: false,
          color: '#007ad0',
          dataLabels: {
            color: 'white',
            style: {
              fontWeight: 'bold',
            },
          },
          borderColor: 'white',
          nodeWidth: 75,
        },
      ],
    };
  }
}
