import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentMember } from '../../hooks/useMembers';
import logo from '../../assets/logo.png';
import LoadingSpinner from '../../utils/LoadingSpinner';
import { Mail, User, Phone, Edit } from 'lucide-react';

const MemberInfo: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const { data: member, isLoading, error } = useCurrentMember();

  if (isLoading) return <LoadingSpinner size="large" />;
  if (error) return <div className="text-center text-red-500">에러 발생: {error.message}</div>;
  if (!member) return <div className="text-center">회원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="mb-8 text-center">
        <img src={logo} alt="깔끔한방 로고" className="mx-auto w-48 h-auto" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">회원 정보</h2>
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            이메일
          </label>
          <div className="flex items-center">
            <Mail className="text-gray-400 mr-2" size={20} />
            <p className="text-gray-700">{member.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            닉네임
          </label>
          <div className="flex items-center">
            <User className="text-gray-400 mr-2" size={20} />
            <p className="text-gray-700">{member.nick}</p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            전화번호
          </label>
          <div className="flex items-center">
            <Phone className="text-gray-400 mr-2" size={20} />
            <p className="text-gray-700">{member.phoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 flex items-center"
            onClick={() => navigate(`/member/${email}/edit`)}
          >
            <Edit className="mr-2" size={20} />
            정보 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;