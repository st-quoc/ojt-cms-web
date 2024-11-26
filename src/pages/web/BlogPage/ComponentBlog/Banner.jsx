import HomeIcon from '@mui/icons-material/Home';

export const Banner = () => {
  return (
    <div>
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRatRNny26CUr1qknhQHrVlpwbJ5Q0cG5IXRw&s"
          alt="Background"
          className="absolute inset-0 w-full h-48 object-cover"
        />
        <div className="relative flex justify-center items-center h-48 bg-opacity-60 bg-black">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">BLOG</h1>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="text-sm">
                <a
                  href="/"
                  className="hover:underline flex items-center space-x-1"
                >
                  <HomeIcon fontSize="small" />
                  <span>Home</span>
                </a>
              </span>
              <span>/</span>
              <span className="text-sm">Blog</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
