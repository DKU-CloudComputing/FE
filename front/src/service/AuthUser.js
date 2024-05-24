import axios from 'axios';

const base = "http://localhost:8080"

const createUser = async (nickname, email, password) => {
  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('email', email);
  formData.append('password', password);

  return await axios.post(base+'/api/signup', formData)
  .then(
    console.log('nickname: ' + nickname),
    console.log('email: ' + email),
    console.log('password: ' + password)
  );
};

/*
const createUserAuthTokenJwt = async (email, password) => {
  return await axios
    .post(base+"/api/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    });
};
*/

const removeUserAuthTokenJwt = () => {
  localStorage.removeItem('token');
};

const getUserAuthToken = () => {
  return localStorage.getItem('token');
};

export default {
  createUser,
  /*createUserAuthTokenJwt,*/
  removeUserAuthTokenJwt,
  getUserAuthToken,
};
