import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  updateEstimate,
  getEstimateList,
  getCommissionList,
} from '../../api/estimate';
import { Estimate, Commission } from '../../types/estimate';

const SendEstimate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const estimateId = id ? parseInt(id, 10) : null;
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [commission, setCommission] = useState<Commission | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchEstimateAndCommission = async () => {
      try {
        const [estimates, commissions] = await Promise.all([
          getEstimateList(),
          getCommissionList(),
        ]);
        const selectedEstimate = estimates.find((e) => e.id === estimateId);
        setEstimate(selectedEstimate || null);

        if (selectedEstimate) {
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
      const updatedEstimate: Partial<Estimate> = {
        ...estimate,
        tmpPrice: finalPrice,
        status: 'CONTACT', // 상태를 SEND로 설정
      };

      await updateEstimate(estimate.id, updatedEstimate);
      alert('견적이 성공적으로 발송되었습니다.');
      navigate('/myestimates');
    } catch (error: any) {
      console.error('Error sending estimate:', error?.message || error);
      alert('An error occurred while sending the estimate. Please try again.');
    }
  };

  if (!estimate || !commission) {
    return <p>Loading estimate and commission details...</p>;
  }

  return (
    <div className="container mx-auto max-w-screen-md mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">견적 발송</h1>
      <div className="bg-white border rounded-lg shadow-lg p-6">
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="finalPrice"
              className="block text-gray-700 font-bold mb-2"
            >
              확정 가격:
            </label>
            <input
              type="number"
              id="finalPrice"
              value={finalPrice}
              onChange={(e) => setFinalPrice(parseFloat(e.target.value))}
              className="w-full border rounded-md py-2 px-3 text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#2ef21d] text-white py-2 px-4 rounded-md"
          >
            견적 발송
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEstimate;
