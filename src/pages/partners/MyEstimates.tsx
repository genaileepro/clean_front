import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstimateList, deleteEstimate } from '../../api/estimate';
import { Estimate } from '../../types/estimate';

const MyEstimates: React.FC = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstimates = async () => {
      setIsLoading(true);
      try {
        const data = await getEstimateList();
        // SEND 상태의 견적은 제외하고 표시
        const filteredEstimates = data.filter(
          (estimate) => estimate.status !== 'SEND',
        );
        setEstimates(filteredEstimates);
      } catch (err) {
        console.error('Error fetching estimates', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 이 견적을 삭제하시겠습니까?')) {
      try {
        await deleteEstimate(id);
        setEstimates(estimates.filter((estimate) => estimate.id !== id));
      } catch (error) {
        console.error('Error deleting estimate', error);
        alert('견적 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSendEstimate = (estimateId: number) => {
    navigate(`/sendestimate/${estimateId}`);
  };

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">나의 견적 목록</h1>
      <div className="flex flex-wrap justify-center">
        {estimates.map((estimate) => (
          <div
            key={estimate.id}
            className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80"
          >
            <h3 className="text-xl font-bold mb-2">청소 견적</h3>
            <p className="text-gray-600 mb-2">
              <strong>의뢰 ID:</strong> {estimate.commissionId}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>임시 가격:</strong> {estimate.tmpPrice}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>설명:</strong> {estimate.statement}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>확정 날짜:</strong> {estimate.fixedDate}
            </p>
            <div className="grid grid-flow-col justify-stretch gap-x-3">
              <button
                onClick={() => navigate(`/editestimate/${estimate.id}`)}
                className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(estimate.id)}
                className="bg-[#ff5b49] text-white py-2 px-4 rounded-md"
              >
                삭제
              </button>
              <button
                onClick={() => handleSendEstimate(estimate.id)}
                className="bg-[#2ef21d] text-white py-2 px-4 rounded-md"
              >
                견적발송
              </button>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default MyEstimates;
