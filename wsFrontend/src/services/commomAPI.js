import axios from "axios"

const commomAPI= async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader
    }
    return await axios(reqConfig)
    .then(res=>{return res})
    .catch(err=>{ return err})
}   

export default commomAPI