import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommissionList } from '../../api/estimate';
import { Commission } from '../../types/estimate';

const CommissionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const commissionId = id ? parseInt(id, 10) : null;
  const [commission, setCommission] = useState<Commission | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const fetchCommission = async () => {
      if (commissionId === null) return;
      try {
        const commissions = await getCommissionList();
        const selectedCommission = commissions.find(
          (c) => c.id === commissionId,
        );
        setCommission(selectedCommission || null);
      } catch (error) {
        console.error('Error fetching commission:', error);
      }
    };

    fetchCommission();
  }, [commissionId]);

  useEffect(() => {
    // Kakao 지도 스크립트 로드 여부 확인
    const isKakaoMapScriptLoaded = () => !!window.kakao && !!window.kakao.maps;

    const loadKakaoMapScript = () => {
      if (isKakaoMapScriptLoaded()) {
        setIsMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => setIsMapLoaded(true);
    };

    loadKakaoMapScript();
  }, []);

  useEffect(() => {
    if (isMapLoaded && commission) {
      const mapContainer = document.getElementById('map'); // 지도가 표시될 div 요소
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 지도 중심
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(commission.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x),
          );

          // 마커 객체를 생성하고 지도에 표시
          new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도의 중심을 설정
          map.setCenter(coords);
        } else {
          console.error('Failed to fetch coordinates for address');
        }
      });
    }
  }, [isMapLoaded, commission]);

  if (!commission) {
    return <p>Loading commission details...</p>;
  }

  return (
    <div className="container mx-auto max-w-screen-lg mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">의뢰 상세 보기</h1>
      <div className="bg-white border rounded-lg shadow-lg p-6">
        {/* 이미지 표시 */}
        {commission.image && (
          <img
            src={commission.image}
            alt="Commission"
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-2xl font-bold mb-4">의뢰 상세 정보</h2>
        <p className="text-gray-600 mb-2">
          <strong>회원 닉네임:</strong> {commission.memberNick}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>주소:</strong> {commission.address}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>집 종류:</strong> {commission.houseType}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>청소 종류:</strong> {commission.cleanType}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>희망 날짜:</strong> {commission.desiredDate}
        </p>
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
      </div>
    </div>
  );
};

export default CommissionView;
