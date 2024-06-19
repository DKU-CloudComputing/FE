import { useState, useEffect } from 'react';
import axios from 'axios';

const ImageData = () => {
  const [imageData, setImageData] = useState([]);

  const base = 'http://localhost:8081';

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(base + '/api/user/image', {params: {userId: localStorage.getItem('userId')}});
        setImageData(response.data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  return imageData;
};

export default ImageData;
