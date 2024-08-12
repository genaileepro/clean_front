import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCommissionList } from '../../api/estimate';
import { Commission } from '../../types/estimate';

const CommissionCalling: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 번호 상태 추가
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부 상태
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  const fetchCommissions = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await getCommissionList(); // 페이지 번호를 API 요청에 전달
      // console.log('Fetched data:', data);

      if (data && Array.isArray(data)) {
        setCommissions((prevCommissions) => [...prevCommissions, ...data]);
        setHasMore(data.length > 0); // 가져온 데이터가 있으면 hasMore를 true로 설정
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching commissions', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions(page); // 페이지 로드 시 처음 데이터를 가져옴
  }, [page]);

  const lastCommissionElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 마지막 요소가 보이면 다음 페이지 데이터 로드
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">회원 새 의뢰 보기</h1>
      <div className="flex flex-wrap justify-center">
        {commissions.map((commission, index) => (
          <div
            key={commission.id}
            ref={
              commissions.length === index + 1 ? lastCommissionElementRef : null
            }
            className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80"
          >
            <h3 className="text-xl font-bold mb-2">청소 견적의뢰</h3>
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
            <button
              onClick={() => navigate(`/writeestimate/${commission.id}`)}
              className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md"
            >
              견적 작성
            </button>
          </div>
        ))}
      </div>
      {isLoading && <p className="text-center mt-4">Loading...</p>}
      {!isLoading && !hasMore && (
        <p className="text-center mt-4">No more commissions available.</p>
      )}
    </div>
  );
};

export default CommissionCalling;
