interface Kakao {
  maps: {
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (
      container: HTMLElement,
      options: { center: KakaoLatLng; level: number },
    ) => KakaoMap;
    Marker: new (options: {
      map: KakaoMap;
      position: KakaoLatLng;
    }) => KakaoMarker;
    services: {
      Geocoder: new () => KakaoGeocoder;
      Status: {
        OK: string;
      };
    };
  };
}

interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
}

interface KakaoMarker {}

interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (
      result: Array<{ x: string; y: string; address_name: string }>,
      status: string,
    ) => void,
  ) => void;
}

declare global {
  interface Window {
    kakao: Kakao;
  }
}

export {};
