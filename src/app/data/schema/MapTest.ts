export class TUser {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = 'James Wick';
    this.location = {
      lat: 33.9715904,
      lng: 33.9715904,
      // lat:parseFloat(lat) to convert a string to a number
    };
  }
}
