import React, { useEffect, useState } from 'react';
import { getEstimateList, updateEstimateStatus } from '../../api/estimate';
import { Estimate } from '../../types/estimate'; // Estimate 타입을 가져옵니다.

const CommissionMatching: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'inProgress' | 'matching' | 'completed'
  >('inProgress');
  const [inProgressEstimates, setInProgressEstimates] = useState<Estimate[]>(
    [],
  );
  const [matchingEstimates, setMatchingEstimates] = useState<Estimate[]>([]);
  const [completedEstimates, setCompletedEstimates] = useState<Estimate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEstimates = async () => {
      setIsLoading(true);
      try {
        const estimateList = await getEstimateList();

        // '진행중' 상태의 카드: status가 'CONTACT'이고 commissionStatus가 'SEND'인 경우
        const inProgress = estimateList.filter(
          (estimate) =>
            estimate.status === 'CONTACT' &&
            estimate.commissionStatus === 'SEND',
        );

        // '매칭중' 상태의 카드: status가 'CONTACT'이고 commissionStatus가 'CONTACT'인 경우
        const matching = estimateList.filter(
          (estimate) =>
            estimate.status === 'CONTACT' &&
            estimate.commissionStatus === 'CONTACT',
        );

        // '완료된' 상태의 카드: status가 'FINISH'인 경우
        const completed = estimateList.filter(
          (estimate) => estimate.status === 'FINISH',
        );

        setInProgressEstimates(inProgress);
        setMatchingEstimates(matching);
        setCompletedEstimates(completed);
      } catch (err) {
        console.error('Error fetching estimates', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  const handleFinalMatch = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setShowModal(true);
  };

  const confirmFinalMatch = async () => {
    if (selectedEstimate) {
      try {
        await updateEstimateStatus(selectedEstimate.id, 'FINISH', 'FINISH');
        setMatchingEstimates((prev) =>
          prev.filter((est) => est.id !== selectedEstimate.id),
        );
        setCompletedEstimates((prev) => [
          ...prev,
          { ...selectedEstimate, status: 'FINISH', commissionStatus: 'FINISH' },
        ]);
        setShowModal(false);
        setSelectedEstimate(null);
      } catch (error) {
        console.error('Error updating estimate status', error);
      }
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'inProgress') {
      return inProgressEstimates.map((estimate) => (
        <div
          key={estimate.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg m-4 p-6 w-80"
        >
          <h3 className="text-xl font-bold text-gray-700 mb-2">진행 중</h3>
          <p className="text-gray-600 mb-2">
            <strong>회원 닉네임:</strong> {estimate.nick}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>주소:</strong> {estimate.address}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>집 종류:</strong> {estimate.houseType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>청소 종류:</strong> {estimate.cleanType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>의뢰 ID:</strong> {estimate.commissionId}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>확정 가격:</strong> {estimate.tmpPrice}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>설명:</strong> {estimate.statement}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>확정 날짜:</strong> {estimate.fixedDate}
          </p>
        </div>
      ));
    } else if (activeTab === 'matching') {
      return matchingEstimates.map((estimate) => (
        <div
          key={estimate.id}
          className="bg-white border border-blue-200 rounded-lg shadow-lg m-4 p-6 w-80"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">매칭 중</h3>
          <p className="text-gray-600 mb-2">
            <strong>회원 닉네임:</strong> {estimate.nick}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>주소:</strong> {estimate.address}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>집 종류:</strong> {estimate.houseType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>청소 종류:</strong> {estimate.cleanType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>의뢰 ID:</strong> {estimate.commissionId}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>확정 가격:</strong> {estimate.tmpPrice}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>설명:</strong> {estimate.statement}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>확정 날짜:</strong> {estimate.fixedDate}
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={() => handleFinalMatch(estimate)}
          >
            최종 매칭
          </button>
        </div>
      ));
    } else if (activeTab === 'completed') {
      return completedEstimates.map((estimate) => (
        <div
          key={estimate.id}
          className="bg-white border border-yellow-200 rounded-lg shadow-lg m-4 p-6 w-80"
        >
          <h3 className="text-xl font-bold text-yellow-700 mb-2">매칭 완료</h3>
          <p className="text-gray-600 mb-2">
            <strong>회원 닉네임:</strong> {estimate.nick}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>주소:</strong> {estimate.address}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>집 종류:</strong> {estimate.houseType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>청소 종류:</strong> {estimate.cleanType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>의뢰 ID:</strong> {estimate.commissionId}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>확정 가격:</strong> {estimate.tmpPrice}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>설명:</strong> {estimate.statement}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>확정 날짜:</strong> {estimate.fixedDate}
          </p>
          <p className="text-green-500 font-bold">매칭 완료</p>
        </div>
      ));
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        견적 매칭 확인하기
      </h1>
      <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4">
        <div className="flex justify-center">
          <button
            className={`py-2 px-4 mx-2 rounded-t-lg border-b-2 ${
              activeTab === 'inProgress'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-200 border-transparent'
            }`}
            onClick={() => setActiveTab('inProgress')}
          >
            진행중
          </button>
          <button
            className={`py-2 px-4 mx-2 rounded-t-lg border-b-2 ${
              activeTab === 'matching'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-200 border-transparent'
            }`}
            onClick={() => setActiveTab('matching')}
          >
            매칭중
          </button>
          <button
            className={`py-2 px-4 mx-2 rounded-t-lg border-b-2 ${
              activeTab === 'completed'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-200 border-transparent'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            완료됨
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {isLoading ? <p>Loading...</p> : renderTabContent()}
        </div>
      </div>

      {/* 모달 창 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">최종 매칭 확인</h2>
            <p className="mb-4">이 견적을 최종 매칭으로 완료하시겠습니까?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={confirmFinalMatch}
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionMatching;
