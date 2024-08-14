import React, { useEffect, useState } from 'react';
import { getEstimateList, getConfirmList } from '../../api/estimate';
import { Estimate } from '../../types/estimate';

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

  useEffect(() => {
    const fetchEstimates = async () => {
      setIsLoading(true);
      try {
        const data = await getEstimateList();

        // 진행중 (SEND 상태)
        const inProgress = data.filter(
          (estimate) => estimate.status === 'SEND',
        );

        // 완료된 매칭 (FINISH 상태)
        const completed = data.filter(
          (estimate) => estimate.status === 'FINISH',
        );

        setInProgressEstimates(inProgress);
        setCompletedEstimates(completed);
      } catch (err) {
        console.error('Error fetching estimates', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMatchingEstimates = async () => {
      try {
        const confirmList = await getConfirmList();
        setMatchingEstimates(
          confirmList.filter((estimate) => estimate.status === 'CHECK'),
        );
      } catch (err) {
        console.error('Error fetching matching estimates', err);
      }
    };

    fetchEstimates();
    fetchMatchingEstimates();
  }, []);

  const renderTabContent = () => {
    if (activeTab === 'inProgress') {
      return inProgressEstimates.map((estimate) => (
        <div
          key={estimate.id}
          className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80"
        >
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
          <h3 className="text-xl font-bold mb-2">청소 견적</h3>
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
          className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80"
        >
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
          <h3 className="text-xl font-bold mb-2">청소 견적</h3>
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
            onClick={() => alert('매칭을 최종 확인하시겠습니까?')}
          >
            최종 매칭
          </button>
        </div>
      ));
    } else if (activeTab === 'completed') {
      return completedEstimates.map((estimate) => (
        <div
          key={estimate.id}
          className="bg-white border rounded-lg shadow-lg m-4 p-6 w-80"
        >
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
          <h3 className="text-xl font-bold mb-2">청소 견적</h3>
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

      <div className="flex justify-center">
        <button
          className={`py-2 px-4 mx-2 rounded-t-lg border-b-2 ${activeTab === 'inProgress' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-transparent'}`}
          onClick={() => setActiveTab('inProgress')}
        >
          진행중
        </button>
        <button
          className={`py-2 px-4 mx-2 rounded-t-lg border-b-2 ${activeTab === 'matching' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-transparent'}`}
          onClick={() => setActiveTab('matching')}
        >
          매칭중
        </button>
        <button
          className={`py-2 px-4 mx-2 rounded-t-lg border-b-2 ${activeTab === 'completed' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-transparent'}`}
          onClick={() => setActiveTab('completed')}
        >
          매칭 완료
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mt-0">
        <div className="flex flex-wrap justify-center">
          {isLoading ? (
            <p className="text-center mt-4">Loading...</p>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionMatching;
