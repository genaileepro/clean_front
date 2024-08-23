import React, { useEffect, useState } from 'react';
import { getEstimateList, updateEstimateStatus } from '../../api/estimate';
import { Estimate } from '../../types/estimate';
import noHistoryImage from '../../assets/noHistory.png'; // 이미지 경로 임포트

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

        const inProgress = estimateList.filter(
          (estimate) =>
            estimate.status === 'CONTACT' &&
            estimate.commissionStatus === 'SEND',
        );

        const matching = estimateList.filter(
          (estimate) =>
            estimate.status === 'CONTACT' &&
            estimate.commissionStatus === 'CONTACT',
        );

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
    const renderCard = (
      estimate: Estimate,
      statusColor: string,
      title: string,
    ) => (
      <div
        key={estimate.id}
        className={`bg-white border ${statusColor} rounded-lg shadow-lg m-4 p-6 w-80`}
      >
        {estimate.image && (
          <img
            src={estimate.image}
            alt="Estimate"
            className="w-full h-40 object-cover rounded-t-lg mb-4"
          />
        )}
        <h3 className={`text-xl font-bold ${statusColor} mb-2`}>{title}</h3>
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
        {activeTab === 'matching' && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={() => handleFinalMatch(estimate)}
          >
            최종 매칭
          </button>
        )}
      </div>
    );

    if (activeTab === 'inProgress') {
      return inProgressEstimates.length > 0 ? (
        inProgressEstimates.map((estimate) =>
          renderCard(estimate, 'border-gray-200 text-gray-700', '진행 중'),
        )
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <img
            src={noHistoryImage}
            alt="No history available"
            className="w-64 h-64 object-contain"
          />
          <p className="text-gray-600 text-xl mt-4 text-center">
            진행 중인 내역이 없습니다.
          </p>
        </div>
      );
    } else if (activeTab === 'matching') {
      return matchingEstimates.length > 0 ? (
        matchingEstimates.map((estimate) =>
          renderCard(estimate, 'border-blue-200 text-blue-700', '매칭 중'),
        )
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <img
            src={noHistoryImage}
            alt="No history available"
            className="w-64 h-64 object-contain"
          />
          <p className="text-gray-600 text-xl mt-4 text-center">
            매칭 중인 내역이 없습니다.
          </p>
        </div>
      );
    } else if (activeTab === 'completed') {
      return completedEstimates.length > 0 ? (
        completedEstimates.map((estimate) =>
          renderCard(
            estimate,
            'border-yellow-200 text-yellow-700',
            '매칭 완료',
          ),
        )
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <img
            src={noHistoryImage}
            alt="No history available"
            className="w-64 h-64 object-contain"
          />
          <p className="text-gray-600 text-xl mt-4 text-center">
            완료된 내역이 없습니다.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl mt-12">
      <h1 className="text-4xl text-center mb-8 font-[JalnanGothic]">
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

        <div
          className={
            inProgressEstimates.length > 0 ||
            matchingEstimates.length > 0 ||
            completedEstimates.length > 0
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'
              : 'flex justify-center items-center mt-8'
          }
        >
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
