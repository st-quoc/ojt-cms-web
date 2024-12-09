import LandingPage from './Components/LandingPage';
import BestSeller from './Components/BestSeller';
import MostCategory from './Components/MostCategory';
import Newsletter from './Components/Newsletter';
import { ScrollToTop } from '../../../component/ScrollToTop';

export const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <LandingPage />
      <BestSeller />
      <MostCategory />
      <Newsletter />
      <ScrollToTop />
    </div>
  );
};
