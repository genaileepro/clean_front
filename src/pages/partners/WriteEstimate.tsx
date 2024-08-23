import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEstimate } from '../../api/estimate';
import { Commission } from '../../types/estimate';
import { getCommissionList } from '../../api/estimate';
import {
  validateDesiredDate,
  validateSignificant,
} from '../../utils/validationUtils';

const WriteEstimate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 commission ID 가져오기
  const commissionId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const [commission, setCommission] = useState<Commission | null>(null);
  const [tmpPrice, setTmpPrice] = useState<number>(0); // 숫자로 초기화
  const [statement, setStatement] = useState<string>('');
  const [fixedDate, setFixedDate] = useState<string>('');

  const [errors, setErrors] = useState({
    tmpPrice: '',
    fixedDate: '',
    statement: '',
  });

  useEffect(() => {
    if (commissionId === null) return;

    const fetchCommission = async () => {
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setTmpPrice(value);
      setErrors((prev) => ({ ...prev, tmpPrice: '' }));
    } else {
      setTmpPrice(0); // 유효하지 않은 입력 시 초기화
      setErrors((prev) => ({
        ...prev,
        tmpPrice: '유효한 숫자를 입력해주세요.',
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { tmpPrice: '', fixedDate: '', statement: '' };

    if (tmpPrice <= 0) {
      newErrors.tmpPrice = '유효한 숫자를 입력해주세요.';
      valid = false;
    }
    if (!validateDesiredDate(fixedDate).isValid) {
      newErrors.fixedDate = '유효한 날짜를 입력해주세요.';
      valid = false;
    }
    if (!validateSignificant(statement).isValid) {
      newErrors.statement = '특이사항은 500자 이내로 입력해주세요.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commission) {
      alert('Commission data is not loaded yet. Please wait and try again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const estimateData = {
        commissionId: commission.id,
        tmpPrice: tmpPrice,
        statement,
        fixedDate,
      };

      console.log('Submitting estimate data:', estimateData);

      await createEstimate(estimateData);
      navigate('/myestimates');
    } catch (error: any) {
      console.error('Error creating estimate:', error?.message || error);
      alert('An error occurred while creating the estimate. Please try again.');
    }
  };

  if (!commission) {
    return <p>Loading commission details...</p>;
  }

  return (
    <div className="container mx-auto max-w-screen-md mt-12">
      <h1 className="text-4xl font-bold text-center mb-8  font-[JalnanGothic]">
        견적 작성
      </h1>
      <div className="bg-white border rounded-lg shadow-lg p-6">
        {/* 이미지 표시 */}
        {commission.image && (
          <img
            src={commission.image}
            alt="Commission"
            className="w-full h-40 object-cover rounded-lg mb-4"
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
              onChange={handlePriceChange}
              className={`w-full border rounded-md py-2 px-3 text-gray-700 ${
                errors.tmpPrice ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.tmpPrice && (
              <p className="text-red-500 text-sm">{errors.tmpPrice}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="statement"
              className="block text-gray-700 font-bold mb-2"
            >
              견적 설명:
            </label>
            <textarea
              id="statement"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className={`w-full border rounded-md py-2 px-3 text-gray-700 ${
                errors.statement ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            ></textarea>
            {errors.statement && (
              <p className="text-red-500 text-sm">{errors.statement}</p>
            )}
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
              onChange={(e) => setFixedDate(e.target.value)}
              className={`w-full border rounded-md py-2 px-3 text-gray-700 ${
                errors.fixedDate ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.fixedDate && (
              <p className="text-red-500 text-sm">{errors.fixedDate}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#0bb8f9] text-white py-2 px-4 rounded-md"
          >
            임시 저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteEstimate;
