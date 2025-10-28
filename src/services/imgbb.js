// ImgBB API service for image uploads

const IMGBB_API_KEY = '4ae736f7f11e8b2a500003cbf95b22dc';
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

export const uploadImageToImgBB = async (file) => {
  try {
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', file);

    const response = await fetch(IMGBB_API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to ImgBB');
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data.url;
    } else {
      throw new Error('ImgBB upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

