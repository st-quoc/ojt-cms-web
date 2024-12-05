import { Fragment } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button } from '@mui/material';

const review = [
  {
    img: 'https://cdn.easyfrontend.com/pictures/users/user8.jpg',
    name: 'Amy Jones',
    rating: 3,
    date: 'July 11,2020',
    content:
      'Well received seems solid, serious seller and word, fast delivery, thank you and congratulations.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    img: 'https://cdn.easyfrontend.com/pictures/users/user28.jpg',
    name: 'Rishab Pant',
    rating: 5,
    date: 'Dec 03,2020',
    content:
      'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.',
  },
  {
    img: 'https://cdn.easyfrontend.com/pictures/users/user15.jpg',
    name: 'Tammy Beaumont',
    rating: 4,
    date: 'March 28,2020',
    content:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
  },
];

const Rating = ({ rating }) => (
  <p className="text-sm mb-4">
    <span className="text-yellow-500">
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = null;
        if (index <= Math.floor(rating)) content = <StarIcon />;
        else if (rating > i && rating < index + 1) content = <StarHalfIcon />;
        else if (index > rating) content = <StarOutlineIcon />;

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
  </p>
);

Rating.propTypes = {
  rating: PropTypes.number,
};

const ReviewItem = ({ item }) => {
  return (
    <>
      <hr className="dark:border-slate-700 my-5" />
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-1/3">
          <div className="flex">
            <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
              <img src={item.img} alt="" className="max-w-full h-auto" />
            </div>
            <div>
              <h5 className="font-medium my-1">{item.name}</h5>
              <Rating rating={item.rating} />
              <p className="text-sm opacity-50">Comment At</p>
              <p className="font-bold mb-0">{item.date}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <p className="text-sm leading-normal opacity-75 mb-6">
            {item.content}
          </p>
        </div>
      </div>
    </>
  );
};

ReviewItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export const Comment = () => {
  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <Box className="container mx-auto">
        <Box className="flex justify-center max-w-[1330px] mx-auto">
          <Box className="bg-white dark:bg-slate-800 rounded p-4 lg:p-8 shadow-lg">
            <Box>
              <Box className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">Customer Review</h2>
                <Box>
                  <Button className="text-blue-600 border border-blue-600 hover:text-white hover:bg-blue-600 rounded py-2 px-5 md:px-6">
                    New Comment
                  </Button>
                </Box>
              </Box>
              {review.map((item, i) => (
                <ReviewItem item={item} key={i} />
              ))}
              <Box className="lg:pt-6 text-center">
                <Button className="text-blue-600 border border-blue-600 hover:text-white hover:bg-blue-600 rounded px-5 md:px-6">
                  Load More
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};
