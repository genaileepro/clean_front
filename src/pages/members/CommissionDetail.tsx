import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCommission, useUpdateCommission } from '../../hooks/useCommissions';
import { Commission, HouseType, CleanType } from '../../types/commission';
import { showErrorNotification } from '../../utils/errorHandler';

const CommissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const commissionId = Number(id);

  const { data: commission, isLoading, error } = useCommission(commissionId);
  const updateCommissionMutation = useUpdateCommission();

  const [isEditing, setIsEditing] = useState(false);
  const [editedCommission, setEditedCommission] = useState<Commission | null>(
    null,
  );

  useEffect(() => {
    if (commission) {
      setEditedCommission(commission);
    }
  }, [commission]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!commission) return <p>Commission not found</p>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedCommission) return;

    try {
      const updateData = {
        image: editedCommission.image,
        size: editedCommission.size,
        houseType: editedCommission.houseType,
        cleanType: editedCommission.cleanType,
        desiredDate: editedCommission.desiredDate,
        significant: editedCommission.significant,
      };

      await updateCommissionMutation.mutateAsync({
        id: commissionId,
        commission: updateData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      showErrorNotification('업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditedCommission((prev) =>
      prev
        ? { ...prev, [name]: name === 'size' ? Number(value) : value }
        : null,
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Commission Detail</h1>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1">Size (m²)</label>
            <input
              type="number"
              name="size"
              value={editedCommission?.size || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">House Type</label>
            <select
              name="houseType"
              value={editedCommission?.houseType || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {Object.values(HouseType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Clean Type</label>
            <select
              name="cleanType"
              value={editedCommission?.cleanType || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {Object.values(CleanType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Desired Date</label>
            <input
              type="datetime-local"
              name="desiredDate"
              value={editedCommission?.desiredDate?.split('.')[0] || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Significant Details</label>
            <textarea
              name="significant"
              value={editedCommission?.significant || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={editedCommission?.image || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={updateCommissionMutation.isPending}
            >
              {updateCommissionMutation.isPending
                ? 'Saving...'
                : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p>
            <strong>Size:</strong> {commission.size} m²
          </p>
          <p>
            <strong>House Type:</strong> {commission.houseType}
          </p>
          <p>
            <strong>Clean Type:</strong> {commission.cleanType}
          </p>
          <p>
            <strong>Desired Date:</strong>{' '}
            {new Date(commission.desiredDate).toLocaleString()}
          </p>
          <p>
            <strong>Significant Details:</strong> {commission.significant}
          </p>
          <p>
            <strong>Image:</strong>{' '}
            {commission.image ? (
              <img
                src={commission.image}
                alt="Commission"
                className="mt-2 max-w-full h-auto"
              />
            ) : (
              'No image'
            )}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      )}
      <button
        onClick={() => navigate('/commissionlist')}
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default CommissionDetail;
