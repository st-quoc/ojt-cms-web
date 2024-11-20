import cailoaImage from '../../../../assets/cailoa.png';

export const LandingPage = () => {
  return (
    <main className="flex flex-col-reverse md:flex-row items-center justify-between w-full py-8 bg-gray-100 px-4 md:px-8">
      <div className="w-full ml-10 md:w-2/5 text-center md:text-left mt-8 md:mt-0 ">
        <p className="text-orange-500 uppercase tracking-widest text-sm md:text-base">
          Trending Collection
        </p>
        <h1 className="text-black text-3xl md:text-5xl font-bold mt-4">
          Retro Old Gramophone With Horn Speaker
        </h1>
        <button className="mt-6 px-6 py-3 bg-black text-white text-sm md:text-lg font-semibold rounded-md hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>

      <div className="w-full md:w-2/5 flex justify-center">
        <img
          src={cailoaImage}
          alt="Gramophone"
          className="h-60 md:h-[500px] object-contain"
        />
      </div>
    </main>
  );
};

export default LandingPage;
