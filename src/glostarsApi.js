import axios from 'axios';

const getPersonalInfo =()=> {
    let encodedURI = window.encodeURI('https://www.glostars.com/Account/Signup');

    return axios.get(encodedURI)
        .then(function (response) {
            return response.data;
        });
};

export default getPersonalInfo;