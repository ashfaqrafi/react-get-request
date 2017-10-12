import axios from 'axios';

     const fetchPopularRepos =(language)=> {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?' +
            'q=stars>1+language:'+ language +'' +
            '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then(function (response) {
                return response.data.items;
            });
 };

// module.exports={
//     fetchPopularRepos
// };

// const PopularRepos = {
//     fetchPopularRepos
// };

// export default PopularRepos;

export default fetchPopularRepos;