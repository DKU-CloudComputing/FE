import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatScreen = () => {
  const base = process.env.REACT_APP_ORDER_BASE;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageSize, setImageSize] = useState(640);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setLoadingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setLoadingTime(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  async function convertToBase64(file) {
    if (!file) {
      return null;
    }
  
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
  
      fileReader.readAsDataURL(file);
    });
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (file && allowedTypes.includes(file.type)) {
      setImageFile(file);
    } else {
      e.target.value = '';
      alert('jpg, png의 확장자 파일만 올려주세요');
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { user: 'You', text: input }]);
      setInput('');
      setLoading(true);

      let apiEndpoint = '/api/creating';
      let encodedImage = null;
      
      if (imageFile) {
        apiEndpoint = '/api/editing';
        try {
          encodedImage = await convertToBase64(imageFile);
          console.log("Encoded Image:", encodedImage);
        } catch (error) {
          console.error('Error converting image to base64:', error);
          setLoading(false);
          return;
        }
      }
      const formData = new FormData();

      formData.append('query', input);
      formData.append('size', imageSize);
      formData.append('userId', localStorage.getItem('userId'));

      if (imageFile) {
        formData.append('image', encodedImage);
      }

      axios.post(base + apiEndpoint, formData, { withCredentials: true })
        .then(response => {
          console.log("API request successful");
          setMessages((prevMessages) => [...prevMessages, { user: 'Imaginairy', image: response.data }]);
          setLoading(false);
        })
        .catch(err => {
          console.log("API request error:", err);
          setLoading(false);
        });
    }
  };

  const pixelOptions = [640, 1280, 1920, 3840, 7680];

  return (
    <div className="app-container">
      <div className="chat-screen">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user === 'You' ? 'user' : 'bot'}`}>
              <strong>{msg.user}:</strong>
              {msg.text && <span>{msg.text}</span>}
              {msg.image && <img src={`data:image/jpeg;base64,${msg.image}`} alt="Fetched" />}
            </div>
          ))}
          {loading && <div className="loading">이미지를 생성 중입니다... ({loadingTime} 초)</div>}
        </div>

        <form className="input-form" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="생성하고 싶은 이미지에 대한 설명을 입력해주세요."
          />
          <input
            type="file"
            onChange={handleImageUpload}
          />
          <div className="size-inputs">
            <label>
              이미지 해상도
              <select value={imageSize} onChange={(e) => setImageSize(e.target.value)}>
                {pixelOptions.map(option => (
                  <option key={option} value={option}>{option} px</option>
                ))}
              </select>
            </label>
        </div>
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
