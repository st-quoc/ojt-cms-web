import { message } from 'antd';
import { CloudinaryContext } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import './upload.scss';

const CloudinaryMultipleUploader = ({ images, setImages }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async e => {
    setLoading(true);
    const { files } = e.target;

    try {
      const uploadedImages = await Promise.all(
        Array.from(files).map(async file => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            import.meta.env.VITE_CLOUDINARY_PRESET,
          );

          const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          return data.secure_url;
        }),
      );

      setImages(prevImages => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.log('ᥫᩣ🚀  error  🚀ᥫᩣ ', error);
      message.error('Error uploading image!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = index => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div>
      <input multiple type="file" onChange={handleImageUpload} />
      {loading && <p>Loading...</p>}
      {0 < images?.length && (
        <CloudinaryContext
          style={{ display: 'flex', maxWidth: '100%', gap: 15, marginTop: 15 }}
        >
          {images.map((imageUrl, index) => (
            <div className="upload" key={index}>
              <img alt="" className="upload__img" src={imageUrl} />
              <div
                className="delete_button"
                onClick={() => handleImageDelete(index)}
              >
                Delete
              </div>
            </div>
          ))}
        </CloudinaryContext>
      )}
    </div>
  );
};

export default CloudinaryMultipleUploader;

CloudinaryMultipleUploader.propTypes = {
  images: PropTypes.array,
  setImages: PropTypes.func,
};
