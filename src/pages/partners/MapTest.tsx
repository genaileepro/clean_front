import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapTest: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map') as HTMLElement;
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);

          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(33.450701, 126.570667),
            map: map,
          });
        });
      }
    };

    script.onerror = () => {
      console.error('Kakao Maps script failed to load.');
    };

    document.head.appendChild(script);
  }, []);
  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MapTest;
