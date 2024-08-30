import React from 'react';
import { useCommissionImage } from '../../hooks/useCommissions';
import { usePartnerCommissionImage } from '../../hooks/useCommissions';
import noImages from '../../assets/noImages.png';

interface CommissionImageProps {
  filename: string;
  className?: string;
  isPartner?: boolean;
}

const CommissionImage: React.FC<CommissionImageProps> = ({
  filename,
  className,
  isPartner = false,
}) => {
  const {
    data: memberImageUrl,
    isLoading: isMemberLoading,
    isError: isMemberError,
  } = useCommissionImage(isPartner ? '' : filename);
  const {
    data: partnerImageUrl,
    isLoading: isPartnerLoading,
    isError: isPartnerError,
  } = usePartnerCommissionImage(isPartner ? filename : '');

  const imageUrl = isPartner ? partnerImageUrl : memberImageUrl;
  const isLoading = isPartner ? isPartnerLoading : isMemberLoading;
  const isError = isPartner ? isPartnerError : isMemberError;

  if (isLoading) return <div className={className}>로딩 중...</div>;
  if (isError || !imageUrl) {
    console.error('Error loading image:', isError);
    return <img src={noImages} alt="No image" className={className} />;
  }

  return <img src={imageUrl} alt="Commission" className={className} />;
};

export default CommissionImage;
