import { useState } from 'react';
import { Header } from '../../../component/Header';
import Footer from '../../../component/Footer/Footer';

export const AboutUs = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div
          className="relative w-full h-64 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://sigiaysneaker.com/wp-content/uploads/2020/03/Banner_giay_th_thao_couple_Dong_H_i_f742f1c6-4d61-4f6b-a308-8df19a71d725_2048x2048.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2">About Us</h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base">
                At S-TIER Shoes, we are dedicated to providing the best footwear
                that combines style, comfort, and quality. From work to sport to
                special occasions, our curated collections feature premium
                materials and modern designs to ensure a perfect fit for every
                step of your journey. Thank you for choosing S-TIER Shoes as
                your trusted footwear destination!
              </p>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  At S-TIER Shoes, our journey began with a simple mission: to
                  create footwear that blends style, comfort, and quality. We
                  believe shoes are more than just accessories—they are a
                  foundation for confidence and self-expression.
                </p>
                <p className="text-gray-700 mb-4">
                  Every pair of shoes in our collection is crafted with care,
                  combining premium materials and modern designs to meet the
                  needs of your daily life, whether it is for work, play, or
                  special moments. We are proud to be part of your journey, one
                  step at a time.
                </p>
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Watch the video
                </button>
              </div>

              <div className="relative">
                {showVideo ? (
                  <div className="relative aspect-w-16 aspect-h-9 w-full h-[400px] lg:h-[400px]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                      src="https://www.youtube.com/embed/GdlSWFyYA8s"
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src="https://bizweb.dktcdn.net/thumb/grande/100/347/923/articles/vans-mule-key-shoes.jpg?v=1621470467950"
                    alt="Team working"
                    className="rounded-lg shadow-md w-full h-[400px] lg:h-[400px]"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
