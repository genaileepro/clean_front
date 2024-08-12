import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const SignUpSelector = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
      <div className="grid bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 hidden sm:block">
          <img
            src={logo}
            alt="깔끔한방 로고"
            className="w-full h-auto max-h-[300px] object-contain"
          />
        </div>
        <div className="p-6 hidden sm:block">
        <div className='flex justify-center items-center'><p>"회원가입 유형을 선택해 주세요"</p></div>
        <br/>
        <div className="flex justify-center items-center space-x-4">
              <button
                className="btn hover:bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => navigate('/signup')}
                type="button"
              >
                고객 회원가입
              </button>
              <button
                className="bg-[#144156] text-white py-2 px-4 rounded"
                onClick={() => navigate('/ptsignup')}
                type="button"
              >
                파트너 회원가입
              </button>
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default SignUpSelector