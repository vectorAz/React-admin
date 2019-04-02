import axios from 'axios'
import {message} from 'antd'
export default function Axios(url, data, method = 'get') {
    method = method.toUpperCase()
    let pro=null;
    if (method === "GET") {
            //axios  请求返回的是一个promise对象
       pro= axios.get(url,
            { params: data }
        )
    } else if (method === 'POST') {
        pro= axios.post(url,
          data
        )
    }

    return pro
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