import React from 'react';
import { useCommissionImage } from '../../hooks/useCommissions';
import noImages from '../../assets/noImages.png';

const CommissionImage: React.FC<{ filename: string; className?: string }> = ({
  filename,
  className,
}) => {
  const { data: imageUrl, isLoading, isError } = useCommissionImage(filename);

  if (isLoading) return <div className={className}>로딩 중...</div>;
  if (isError || !imageUrl)
    return <img src={noImages} alt="No image" className={className} />;

  return <img src={imageUrl} alt="Commission" className={className} />;
};

export default CommissionImage;
