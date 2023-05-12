import { ElementRef } from '@angular/core';

enum TravelMode {
  BICYCLING = 'BICYCLING',
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  TWO_WHEELER = 'TWO_WHEELER',
  WALKING = 'WALKING',
}

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

  ds: google.maps.DirectionsService;
  dr: google.maps.DirectionsRenderer;

  source = new google.maps.LatLng(33.9715904, -6.8498129);
  destination = new google.maps.LatLng(31.63, -8.008889);

  service = new google.maps.DistanceMatrixService();

  private destinations: Mappable[];

  constructor(container: ElementRef) {
    this.googleMap = new google.maps.Map(container.nativeElement, {
      center: new google.maps.LatLng(33.9715904, -6.8498129),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    this.compute();
    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
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

  compute() {
    this.service.getDistanceMatrix(
      {
        origins: [this.source],
        destinations: [this.destination],
        travelMode: TravelMode.DRIVING,
        transitOptions: {},
        drivingOptions: { departureTime: new Date() },
        unitSystem: 0,
        avoidHighways: true,
        avoidTolls: true,
      },
      this.callback
    );
  }

  callback(response: any, status: any) {
    console.log('response', response);
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;

          console.log('element response', element);
          var from = origins[i];
          var to = destinations[j];
        }
      }
    }
  }
}
