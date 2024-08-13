import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getEstimateList,
  deleteEstimate,
  updateEstimate,
} from '../../api/estimate';
import { Estimate } from '../../types/estimate';

const MyEstimates: React.FC = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstimates = async () => {
      setIsLoading(true);
      try {
        const data = await getEstimateList(); // API 호출로 모든 견적 데이터 가져오기
        setEstimates(data);
      } catch (error) {
        console.error('Error fetching estimates', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteEstimate(id); // API 호출로 견적 삭제
      setEstimates(estimates.filter((estimate) => estimate.id !== id)); // 삭제된 항목을 목록에서 제거
    } catch (error) {
      console.error('Error deleting estimate', error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/editestimate/${id}`); // 수정 페이지로 이동
  };

  const handleSend = (id: number) => {
    // 견적 발송 로직을 추가할 예정
    console.log(`Sending estimate with id: ${id}`);
  };

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        나의 예상 견적 목록
      </h1>
      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {estimates.map((estimate) => (
            <div
              key={estimate.id}
              className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80"
            >
              <h3 className="text-xl font-bold mb-2">예상 견적</h3>
              <p className="text-gray-600 mb-2">
                <strong>의뢰 ID:</strong> {estimate.commissionId}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>가격:</strong> {estimate.tmpPrice}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>설명:</strong> {estimate.statement}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>확정 날짜:</strong> {estimate.fixedDate}
              </p>
              <button
                onClick={() => handleEdit(estimate.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2 w-full"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(estimate.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md mb-2 w-full"
              >
                삭제
              </button>
              <button
                onClick={() => handleSend(estimate.id)}
                className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
              >
                견적 발송
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEstimates;
