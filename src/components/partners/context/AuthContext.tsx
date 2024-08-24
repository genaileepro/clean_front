import { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axiosConfig';
import partnerApi from '../api/partnerAxiosConfig';
import { Member } from '../types/member';
import { Partner } from '../types/partner';

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  member: Member | null;
  partner: Partner | null;
  login: (
    token: string,
    refreshToken: string,
    isPartner: boolean,
    id: number,
  ) => void; // 여기서 id 추가
  logout: () => void;
  fetchProfile: (isPartner?: boolean) => Promise<Boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [member, setMember] = useState<Member | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (isPartner: boolean = false) => {
    setLoading(true);
    try {
      if (isPartner) {
        const response = await partnerApi.get<Partner>('/partner/profile');
        setPartner(response.data);
      } else {
        const response = await api.get<Member>('/members/profile');
        setMember(response.data);
      }
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
      logout();
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const isPartner = localStorage.getItem('isPartner') === 'true';
      if (storedToken) {
        await fetchProfile(isPartner);
      }
    };

    checkAuth();
  }, []);

  const login = (
    token: string,
    refreshToken: string,
    isPartner: boolean = false,
    partnerId?: number, // partnerId를 추가로 받아올 수 있도록 수정
  ) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('isPartner', isPartner ? 'true' : 'false');

    // 파트너 로그인인 경우 partnerId 저장
    if (isPartner && partnerId) {
      localStorage.setItem('partnerId', partnerId.toString());
    }

    setIsAuthenticated(true);
    fetchProfile(isPartner);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isPartner'); // 여기 추가
    setIsAuthenticated(false);
    setMember(null);
    setPartner(null);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    member,
    partner,
    login,
    logout,
    fetchProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
