import { Banner } from './ComponentBlog/Banner';
import { BlogList } from './ComponentBlog/BlogList';
import { ScrollToTop } from '../../../component/ScrollToTop';

export const BlogPage = () => {
  return (
    <div>
      <Banner />
      <BlogList />
      <ScrollToTop />
    </div>
  );
};
