import { Header } from '../../../component/Header';
import { Banner } from './component/Banner';
import { BlogList } from './component/BlogList';
import Footer from '../../../component/Footer/Footer';

export const BlogPage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <BlogList />
      <Footer />
    </div>
  );
};
