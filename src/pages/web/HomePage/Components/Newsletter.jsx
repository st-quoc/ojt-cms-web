export const Newsletter = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-white p-4 md:p-8 border-t">
      {/* Text Content */}
      <div className="text-center md:text-left md:ml-10 lg:ml-40">
        <h2 className="text-lg md:text-xl font-semibold">
          Join Our Newsletter
        </h2>
        <p className="text-sm md:text-base">
          Stay up to date with new collections and exclusive offers.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center md:justify-start">
          <input
            type="email"
            placeholder="Your email address"
            className="p-2 border rounded-t sm:rounded-l sm:rounded-t-none"
          />
          <button className="bg-black text-white py-2 px-4 rounded-b sm:rounded-r sm:rounded-b-none">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Image */}
      <img
        src="https://www.kienminh.edu.vn/Upload/Editor/2022/5/25/8-57ff.png"
        alt="Telescope"
        className="h-28 md:h-32 mt-6 md:mt-0 rounded-lg md:mr-10 lg:mr-40"
      />
    </section>
  );
};
export default Newsletter;
