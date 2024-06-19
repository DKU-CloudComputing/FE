import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageData from '../layout/ImageData';

function DashBoard() {
  const imageData = ImageData();
  const [images, setImages] = useState(imageData);

  useEffect(() => {
    setImages(imageData);
  }, [imageData]);

  const downloadImage = (base64Image, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${base64Image}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteImage = async (id) => {
    try {
      const response = await axios.delete(process.env.REACT_APP_ORDER_BASE+'/api/user/image/'+id);
      if (response.status === 200) {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
      } else {
        console.error('Failed to delete the image');
      }
    } catch (error) {
      console.error('An error occurred while deleting the image:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={`data:image/jpeg;base64,${image.image}`} alt="Fetched" />
            <p>{image.query}</p>
            <button
              onClick={() => downloadImage(image.image, `image-${image.id}.jpg`)}
              className="download-button"
            >
              다운로드
            </button>
            <button
              onClick={() => deleteImage(image.id)}
              className="delete-button"
            >
              삭제
            </button>
          </div>
        ))
      ) : (
        <p className="no-data">데이터가 없습니다</p>
      )}
    </div>
  );
}

export default DashBoard;
