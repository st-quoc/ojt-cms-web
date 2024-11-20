import Header from '../../../component/Header';
import LandingPage from './Components/LandingPage';
import BestSeller from './Components/BestSeller';
import MostCategory from './Components/MostCategory';
import Newsletter from './Components/Newsletter';
import Footer from '../../../component/Footer/Footer';

export const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <Header />
      <LandingPage />
      <BestSeller />
      <MostCategory />
      <Newsletter />
      <Footer />
    </div>
  );
};
