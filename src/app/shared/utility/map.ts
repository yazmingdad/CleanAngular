import { ElementRef } from '@angular/core';

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string, container: ElementRef) {
    this.googleMap = new google.maps.Map(container.nativeElement, {
      center: new google.maps.LatLng(33.9715904, -6.8498129),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
