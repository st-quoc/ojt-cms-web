import { Header } from '../../../component/Header';
import { Banner } from './ComponentBlog/Banner';
import { BlogList } from './ComponentBlog/BlogList';
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
