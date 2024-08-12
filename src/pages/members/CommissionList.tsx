import React from 'react';
import { Link } from 'react-router-dom';
import {
  useCommissions,
  useDeleteCommission,
} from '../../hooks/useCommissions';
import { Commission } from '../../types/commission';
import { showErrorNotification } from '../../utils/errorHandler';

const CommissionList: React.FC = () => {
  const { data: commissions, isLoading, error } = useCommissions();
  const deleteCommissionMutation = useDeleteCommission();

  const handleDeleteCommission = async (id: number) => {
    if (window.confirm('정말로 이 의뢰를 삭제하시겠습니까?')) {
      try {
        await deleteCommissionMutation.mutateAsync(id);
      } catch (error) {
        console.error('Delete failed:', error);
        showErrorNotification('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!commissions || commissions.length === 0)
    return <p>의뢰 목록이 비어있습니다.</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Commission List</h1>
      <ul className="space-y-4">
        {commissions.map((commission: Commission) => (
          <li
            key={commission.commissionId}
            className="bg-white shadow rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold">Size: {commission.size}</h2>
            <p>House Type: {commission.houseType}</p>
            <p>Clean Type: {commission.cleanType}</p>
            <p>
              Desired Date: {new Date(commission.desiredDate).toLocaleString()}
            </p>
            <p>Significant: {commission.significant}</p>
            <div className="mt-4 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteCommission(commission.commissionId)}
              >
                Delete
              </button>
              <Link
                to={`/commissiondetail/${commission.commissionId}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
              >
                Update
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommissionList;
