declare global {
  interface Window {
    kakao: any; // kakao 객체의 모든 속성에 접근 가능하게 설정
  }
}

declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class Marker {
    constructor(options: MarkerOptions);
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
  }

  namespace services {
    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: any[], status: Status) => void,
      ): void;
    }

    enum Status {
      OK = 'OK',
      ZERO_RESULT = 'ZERO_RESULT',
      ERROR = 'ERROR',
    }
  }
}
