import Axios from './axios'
import jsonp from 'jsonp'
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000'
//解决跨域


export const reqLogin = (username, password) => Axios(prefix + '/login', {
    username,
    password
}, 'post')

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            (err, data) => {
                if (!err) {
                    const {
                        dayPictureUrl,
                        weather
                    } = data.results[0].weather_data[0]
                    resolve({
                        weather,
                        weatherImg: dayPictureUrl
                    })

                } else {
                    reject('请求失败')
                }
            })
    })
}
//获取菜单列表
export const getitem = (parentId) => {
    return Axios(prefix + '/manage/category/list', {
        parentId
    }, 'get')
}
//添加分类
export const addcreatItem = (parentId, categoryName) => {
    return Axios(prefix + '/manage/category/add', {
        parentId,
        categoryName
    }, 'Post')
}
//获取产品分页列表
export const GETproductItem = (pageNum, pageSize) => {
    return Axios(prefix + '/manage/product/list', {
        pageNum,
        pageSize
    })
}

export const SETgoods = (product) => {
    return Axios(prefix + '/manage/product/add', 
    product
    ,'post')
}