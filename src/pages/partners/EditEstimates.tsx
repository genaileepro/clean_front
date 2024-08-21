import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  updateEstimate,
  getEstimateList,
  getCommissionList,
} from '../../api/estimate'; // getCommissionList API 가져오기
import { Estimate, Commission } from '../../types/estimate'; // Estimate와 Commission 타입 가져오기

const EditEstimates: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 estimate ID 가져오기
  const navigate = useNavigate();
  const estimateId = id ? parseInt(id, 10) : null; // id를 숫자로 변환
  const [estimate, setEstimate] = useState<Estimate | null>(null); // Estimate 타입 상태 정의
  const [commission, setCommission] = useState<Commission | null>(null); // Commission 타입 상태 정의
  const [tmpPrice, setTmpPrice] = useState<number>(0);
  const [statement, setStatement] = useState<string>('');
  const [fixedDate, setFixedDate] = useState<string>('');

  useEffect(() => {
    const fetchEstimateAndCommission = async () => {
      try {
        const estimates = await getEstimateList();
        const selectedEstimate = estimates.find((e) => e.id === estimateId);
        setEstimate(selectedEstimate || null);

        if (selectedEstimate) {
          setTmpPrice(selectedEstimate.tmpPrice);
          setStatement(selectedEstimate.statement);
          setFixedDate(selectedEstimate.fixedDate);

          // Commission 데이터를 가져오기 위한 로직
          const commissions = await getCommissionList();
          const selectedCommission = commissions.find(
            (c) => c.id === selectedEstimate.commissionId,
          );
          setCommission(selectedCommission || null);
        }
      } catch (error) {
        console.error('Error fetching estimate and commission:', error);
      }
    };

    if (estimateId !== null) {
      fetchEstimateAndCommission();
    }
  }, [estimateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!estimate) {
      alert('Estimate data is not loaded yet. Please wait and try again.');
      return;
    }

    try {
      const updatedEstimate = {
        ...estimate,
        tmpPrice,
        statement,
        fixedDate,
      };

      await updateEstimate(estimate.id, updatedEstimate);
      alert('견적이 성공적으로 수정되었습니다.');
      navigate('/myestimates');
    } catch (error: any) {
      console.error('Error updating estimate:', error?.message || error);
      alert('An error occurred while updating the estimate. Please try again.');
    }
  };

  if (!estimate || !commission) {
    return <p>Loading estimate and commission details...</p>;
  }

  return (
    <div className="container mx-auto max-w-screen-md mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">견적 수정</h1>
      <div className="bg-white border rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">의뢰 상세 정보</h2>
        {/* 이미지 표시 */}
        {commission.image && (
          <img
            src={commission.image}
            alt="Commission"
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="tmpPrice"
              className="block text-gray-700 font-bold mb-2"
            >
              임시 가격:
            </label>
            <input
              type="number"
              id="tmpPrice"
              value={tmpPrice}
              onChange={(e) => setTmpPrice(parseFloat(e.target.value))}
              className="w-full border rounded-md py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="statement"
              className="block text-gray-700 font-bold mb-2"
            >
              설명:
            </label>
            <textarea
              id="statement"
              value={statement}
              className="w-full border rounded-md py-2 px-3 text-gray-700 bg-gray-100"
              disabled
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="fixedDate"
              className="block text-gray-700 font-bold mb-2"
            >
              확정 날짜:
            </label>
            <input
              type="datetime-local"
              id="fixedDate"
              value={fixedDate}
              className="w-full border rounded-md py-2 px-3 text-gray-700 bg-gray-100"
              disabled
            />
          </div>
          <button
            type="submit"
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md"
          >
            저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEstimates;
