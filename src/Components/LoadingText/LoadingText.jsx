import { useEffect, useState } from 'react';

const LoadingText = () => {
  const [suffix, setSuffix] = useState('...');
  useEffect(() => {
    const timer = setInterval(() => {
      setSuffix(prev => prev.length < 3 ? `${prev}.` : '.');
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <span className="loading-text">
        Loading{suffix}
    </span>
  );
};

export default LoadingText;
