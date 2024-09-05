import React from 'react';

interface SimplePayButtonProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const SimplePayButton: React.FC<SimplePayButtonProps> = ({
  id,
  name,
  icon,
  isSelected,
  onClick,
}) => (
  <button
    className={`flex items-center justify-start w-full p-3 border rounded-lg transition-colors ${
      isSelected ? 'bg-brand text-white' : 'hover:bg-gray-50'
    }`}
    onClick={() => onClick(id)}
  >
    <img src={icon} alt={name} className="w-6 h-6 mr-3" />
    <span className="flex-grow text-left">{name}</span>
  </button>
);

const SimplePaySection: React.FC<{
  simplePayMethod: string;
  setSimplePayMethod: (method: string) => void;
}> = ({ simplePayMethod, setSimplePayMethod }) => {
  const simplePay = [
    { id: 'naverpay', name: '네이버 페이', icon: '/public/NaverIcon.webp' },
    { id: 'kakaopay', name: '카카오 페이', icon: '/public/KakaoIcon.webp' },
    { id: 'ssgpay', name: 'SSG 페이', icon: '/public/SsgIcon.webp' },
    { id: 'samsungpay', name: '삼성 페이', icon: '/public/SamsungIcon.png' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">간편 결제 선택</h3>
      <div className="grid grid-cols-2 gap-4">
        {simplePay.map(method => (
          <SimplePayButton
            key={method.id}
            {...method}
            isSelected={simplePayMethod === method.id}
            onClick={setSimplePayMethod}
          />
        ))}
      </div>
    </div>
  );
};

export default SimplePaySection;
