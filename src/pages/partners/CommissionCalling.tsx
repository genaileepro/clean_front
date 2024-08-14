import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCommissionList } from '../../api/estimate';
import { Commission } from '../../types/estimate';

const CommissionCalling: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [visibleCommissions, setVisibleCommissions] = useState<Commission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommissions = async () => {
      setIsLoading(true);
      try {
        const data = await getCommissionList(); // API 요청으로 모든 Commission 데이터 가져오기
        setCommissions(data);
        setVisibleCommissions(data.slice(0, 9)); // 초기 로드 시 첫 페이지의 9개 데이터만 표시
        setHasMore(data.length > 9);
      } catch (err) {
        console.error('Error fetching commissions', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  const loadMore = useCallback(() => {
    const newPage = page + 1;
    const newCommissions = commissions.slice(newPage * 9 - 9, newPage * 9);
    setVisibleCommissions((prev) => [...prev, ...newCommissions]);
    setPage(newPage);
    setHasMore(commissions.length > newPage * 9);
  }, [commissions, page]);

  const handleWriteEstimate = (commissionId: number) => {
    navigate(`/writeestimate/${commissionId}`);
    // 견적 작성을 완료한 commission을 visibleCommissions에서 제거
    setVisibleCommissions((prevCommissions) =>
      prevCommissions.filter((commission) => commission.id !== commissionId)
    );
  };

  const lastCommissionElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore(); // 마지막 요소가 보이면 더 많은 데이터를 로드
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore],
  );

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">회원 새 의뢰 보기</h1>
      <div className="flex flex-wrap justify-center">
        {visibleCommissions.map((commission, index) => (
          <div
            key={commission.id}
            ref={
              visibleCommissions.length === index + 1
                ? lastCommissionElementRef
                : null
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
              onClick={() => handleWriteEstimate(commission.id)}
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
