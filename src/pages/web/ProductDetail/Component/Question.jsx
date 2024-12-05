import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Box, Button, Typography } from '@mui/material';

const commentList = [
  {
    profilePhoto:
      'https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg',
    userName: 'Tahlia McGrath',
    title: 'How to solve the issues',
    comment:
      'Arcu leo, facilisi amet, et, facilisi nulla etiam. Velit facilisis posuere nec nunc pharetra, nulla integer euisi, massa vestibulum mauris risus...',
    date: '1 hour ago',
    commentCount: 27,
    comments: [],
  },
  {
    profilePhoto:
      'https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg',
    userName: 'Alana King',
    title: 'Facing Problem with this code.',
    comment:
      "Third fruitful dry morning isn't doesn't seasons sixth yielding can't unto likeness saying they're first. All unto void wherein, second...",
    date: '3 days ago',
    commentCount: 2,
    comments: [],
  },
];

const Comment = ({ comment, children }) => (
  <Box className="flex">
    <Box className="mr-4">
      <img
        src={comment.profilePhoto}
        alt={comment.userName}
        className="max-w-full h-auto rounded-full border dark:border-slate-700"
        width="70"
      />
    </Box>
    <Box>
      <Box className="flex flex-col md:flex-row flex-grow justify-between">
        <Box className="w-full md:w-9/12">
          <h6 className="font-medium">{comment.userName}</h6>
          <h6 className="font-medium mb-2">{comment.title}</h6>
          <Typography className="text-sm">{comment.comment}</Typography>
          <Box className="flex items-center mt-3">
            <ChatBubbleIcon className="text-blue-600 mr-2" />
            <Typography className="mb-0">
              {comment.commentCount} comments
            </Typography>
          </Box>
        </Box>
        <Box className="w-full md:w-3/12 md:text-end">
          <Typography className="">1 hour ago</Typography>
        </Box>
      </Box>
      {children}
    </Box>
  </Box>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const RenderComments = ({ comments }) => (
  <Fragment>
    {comments.map((comment, i) => (
      <Fragment key={i}>
        {!!i && (
          <hr className="border-blue-600 dark:border-blue-600 opacity-20 my-6" />
        )}
        <Comment comment={comment}>
          {!!comment.comments.length && (
            <Fragment>
              <hr className="border-blue-600 dark:border-blue-600 opacity-20 my-6" />
              <RenderComments comments={comment.comments} />
            </Fragment>
          )}
        </Comment>
      </Fragment>
    ))}
  </Fragment>
);

RenderComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

const Comments = ({ comments }) => (
  <Box className="bg-white dark:bg-slate-800 rounded w-full">
    <Box className="p-4 md:p-6 lg:px-12">
      <RenderComments comments={comments} />
    </Box>
  </Box>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export const Question = () => {
  return (
    <section className="pb-14 md:pb-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <Box className="container mx-auto">
        <Box className="flex justify-center max-w-[1330px] mx-auto">
          <Box className="bg-white dark:bg-slate-800 rounded p-4 lg:p-8 shadow-lg">
            <Box className="lg:px-12 bg-white">
              <Box className="flex flex-col md:flex-row justify-between md:items-center gap-4 my-6">
                <h4 className="text-2xl font-medium">
                  13 questions in this course
                </h4>
                <Button className="text-blue-600 border border-blue-600 hover:text-white hover:bg-blue-600 rounded py-3 px-5 md:px-8">
                  Ask Question
                </Button>
              </Box>
              <hr className="border-blue-600 dark:border-blue-600 opacity-20 my-6" />
              <Comments comments={commentList} />
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
