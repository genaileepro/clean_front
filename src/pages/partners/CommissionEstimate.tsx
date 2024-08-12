import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import partnerApi from '../../api/partnerAxiosConfig';
import ErrorNotification from '../../utils/ErrorNotification';

const CommissionEstimate: React.FC = () => {
  const { commissionId } = useParams<{ commissionId: string }>();
  const [estimate, setEstimate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEstimateSubmit = async () => {
    try {
      // 여기에 견적 작성 API 호출 코드를 추가하세요
      await partnerApi.post(`/commissions/${commissionId}/estimate`, { estimate });

      // 견적 작성 후 "내 견적목록" 페이지로 이동
      navigate('/myestimates');
    } catch (err) {
      setError('Error submitting estimate');
    }
  };

  return (
    <div>
      <h1>Commission Estimate</h1>
      {error && <ErrorNotification message={error} />}
      <textarea
        value={estimate}
        onChange={(e) => setEstimate(e.target.value)}
        placeholder="견적 내용을 입력하세요"
      />
      <button className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md m-2" onClick={handleEstimateSubmit}>견적 제출</button>
    </div>
  );
};

export default CommissionEstimate;
