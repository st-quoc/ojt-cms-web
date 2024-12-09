import { arrowRight } from '../../../../assets/icons';
import { offer } from '../../../../assets/images';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Button from '../../../../component/Button';
import { useNavigate } from 'react-router-dom';

const SpecialOffer = () => {
  const navigate = useNavigate();

  return (
    <section
      className={`flex flex-wrap items-center max-xl:flex-col-reverse gap-10 max-container `}
    >
      <TrackVisibility partialVisibility once>
        {({ isVisible }) => (
          <div
            className={`flex-1 ${
              isVisible
                ? 'animate__animated animate__fadeIn animate__slower'
                : ''
            }`}
          >
            <img src={offer} className="w-full rounded-lg" />
          </div>
        )}
      </TrackVisibility>
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          <span className="text-purple-900">Special </span>
          Offer
        </h2>
        <p className="mt-4 info-text">
          Embark on a shopping journey that redefines your experience with
          unbeatable deals. From premier selections to incredible savings, we
          offer unparalleled value that sets us apart.
        </p>
        <p className="mt-6 info-text">
          Navigate a realm of possibilities designed to fulfill your unique
          desires, surpassing the loftiest expectations. Your journey with us is
          nothing short of exceptional.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button
            label="Shop now"
            iconURL={arrowRight}
            onClick={() => navigate('/products')}
          />
          <Button
            label="Learn more"
            backgroundColor="bg-white"
            borderColor="border-slate-gray"
            textColor="text-slate-gray"
            onClick={() => navigate('/about-us')}
          />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
