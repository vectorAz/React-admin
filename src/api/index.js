import Axios from './axios'

const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000'
                    //解决跨域

export const reqLogin = (username, password) => Axios(prefix + '/login', {
    username,
    password
}, 'post')