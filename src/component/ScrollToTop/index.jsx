import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ScrollToTop = () => {
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrollTopVisible(true);
      } else {
        setIsScrollTopVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isScrollTopVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300 z-50"
      >
        <ArrowUpwardIcon />
      </button>
    )
  );
};
