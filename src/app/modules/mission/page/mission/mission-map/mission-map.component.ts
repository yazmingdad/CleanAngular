import { Component, ElementRef, ViewChild } from '@angular/core';
import { TUser } from 'src/app/data/schema/MapTest';
import { CustomMap } from 'src/app/shared/utility/map';

@Component({
  selector: 'app-mission-map',
  templateUrl: './mission-map.component.html',
  styleUrls: ['./mission-map.component.css'],
})
export class MissionMapComponent {
  user = new TUser();
  @ViewChild('map') mapElement: ElementRef;
  map: CustomMap;
  constructor() {}

  ngAfterViewInit() {
    this.map = new CustomMap('47', this.mapElement);
  }

  ngOnInit() {
    console.log('ngOnInit', this.mapElement);
  }

  // ngOnInit(): void {
  //   const mapProperties = {
  //     center: new google.maps.LatLng(35.2271, -80.8431),
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //   };
  //   this.map = new google.maps.Map(
  //     this.mapElement.nativeElement,
  //     mapProperties
  //   );
  // }
}
