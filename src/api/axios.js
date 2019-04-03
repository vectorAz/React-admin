import axios from 'axios'
import {message} from 'antd'  //引入全局提示
export default function Axios(url, data, method = 'get') {
    method = method.toUpperCase() //统一转换为答谢
    let pro=null;   
    if (method === "GET") {
            //axios  请求返回的是一个promise对象
       pro= axios.get(url,
            { params: data }
        )
    } else if (method === 'POST') {
        pro= axios.post(url,data)
    }

    return pro //pro接住axios的返回值后也是一个promise对象 可以使用then catch方法
    //返回一个经过axios请求后得到的数据 或错误
            .then((res) => {
             return res.data
                
            })
            .catch((err) => {
                console.log('*****');
                console.log(err);
                console.log('*****');
                
                message.err('网络异常 请重试')
            })
}