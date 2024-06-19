
import axios from 'axios';
 
const base = process.env.REACT_APP_LOGIN_BASE;

const createUser = async (nickname, email, password) => {
  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('email', email);
  formData.append('password', password);

  return await axios.post(base+'/api/signup', formData)
  .then( (response) => {
    console.log('nickname: ' + nickname);
    console.log('email: ' + email);
    console.log('password: ' + password);
    localStorage.setItem('userId', response.data.id);
  }
  );
};

const editUser = async (nickname, email, password) => {
  const formData = new FormData();
  formData.append('userId', localStorage.getItem('userId'));
  formData.append('nickname', nickname);
  formData.append('email', email);
  formData.append('password', password);

  return await axios.post(base+'/api/user/edit', formData)
  .then( (response) => {
    console.log('nickname: ' + nickname);
    console.log('email: ' + email);
    console.log('password: ' + password);
    localStorage.setItem('userId', response.data.id);
  }
  );
};


const createUserSession = async (email, password) => {

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  return await axios
    .post(base+"/api/login", formData)
    .then((response) => {
      const sessionId = response.data.jsessionId;
      if (sessionId) {
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('userId', response.data.authentication.principal.id);
        console.log('로그인 성공');
      } else {
        console.log('jsessionId 정보가 없습니다.');
      }
    })
    .catch(error => {
      console.log('로그인 실패');
    });
};

const removeUserSessionId = () => {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('userId');
};

const getUserSessionId = () => {
  if ('sessionId' in localStorage) {
    return localStorage.getItem('sessionId');
  }
  else{
    return false;
  }
};

// eslint-disable-next-line
export default {
  createUser,
  editUser,
  createUserSession,
  removeUserSessionId,
  getUserSessionId,
};
