import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const LoginSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[200px] object-contain mb-6"
          />
          <p className="text-center text-lg mb-6">
            로그인 유형을 선택해 주세요
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="w-full sm:w-auto btn hover:bg-blue-500 text-white py-3 px-6 rounded text-sm sm:text-base"
              onClick={() => navigate('/login')}
              type="button"
            >
              고객 로그인
            </button>
            <button
              className="w-full sm:w-auto bg-[#144156] hover:bg-[#1c5a75] text-white py-3 px-6 rounded text-sm sm:text-base"
              onClick={() => navigate('/ptlogin')}
              type="button"
            >
              파트너 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;
