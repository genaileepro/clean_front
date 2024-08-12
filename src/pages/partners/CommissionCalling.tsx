import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import partnerApi from '../../api/partnerAxiosConfig';
import { useAuth } from '../../hooks/useAuth';

interface Commission {
  id: number;
  description: string;
  // Add other properties as needed
}

const CommissionCalling: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const fetchCommissions = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await partnerApi.get(`/commissions`, {
        params: { page, size: 10 },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;

      if (data && Array.isArray(data.content)) {
        setCommissions((prevCommissions) => [
          ...prevCommissions,
          ...data.content,
        ]);
        setHasMore(data.content.length > 0);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error('Unexpected API response structure:', data);
        setError('Unexpected data structure received from the server');
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching commissions', err);
      if (err.response && err.response.status === 401) {
        console.error('unauthorized - Logging out');
        logout();
        navigate('/partnerlogin');
      } else {
        setError('Failed to fetch commissions. Please try again later.');
        console.error('An error occurred:', err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, navigate, logout, isLoading, hasMore]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/partnerlogin');
      return;
    }
    fetchCommissions();
  }, [isAuthenticated, navigate, fetchCommissions]);

  const lastCommissionElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchCommissions();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchCommissions, hasMore, isLoading],
  );

  const handleSelectCommission = (commissionId: number) => {
    navigate(`/commissionestimate/${commissionId}`);
  };

  if (!isAuthenticated) {
    return null; // or a loading indicator
  }

  return (
    <div>
      <h1>Commission Calling</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {commissions.map((commission, index) => (
          <div
            key={commission.id}
            ref={
              commissions.length === index + 1 ? lastCommissionElementRef : null
            }
          >
            <p>{commission.description}</p>
            <button onClick={() => handleSelectCommission(commission.id)}>
              견적 작성
            </button>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !hasMore && commissions.length === 0 && (
        <p>No commissions available.</p>
      )}
    </div>
  );
};

export default CommissionCalling;
