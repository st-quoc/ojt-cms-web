const uploadToCloudinary = async file => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
  const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  const url = data.url;

  return url;
};

export default uploadToCloudinary;
