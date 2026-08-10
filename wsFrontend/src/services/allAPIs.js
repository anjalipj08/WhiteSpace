import { serverURL } from "./serverURL";
import commomAPI from "./commomAPI";

//register API
export const registerUserAPI = async(reqBody)=>{
    return await commomAPI('POST', `${serverURL}/register`, reqBody, {})
}

//Login API
export const loginUserAPI = async(reqBody)=>{
    return await commomAPI('POST', `${serverURL}/login`, reqBody, {})
}

//Add Resource API
export const addResourceAPI = async(reqBody,reqHeader)=>{
    return await commomAPI('POST', `${serverURL}/addResource`, reqBody,reqHeader)
}

//Get all Resource API
export const getAllResourceAPI = async(reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/getAllResource`, {},reqHeader)
}

//Get latest Resource API
export const getLatestResourceAPI = async(reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/getLatestResource`, {},reqHeader)
}

//get Resource (based on email)
export const getResourceAPI = async(reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/getResource`, {},reqHeader)
}

//view Resource API
export const viewResourceAPI = async(id,reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/viewResource/${id}`, {},reqHeader)
}

//delete Resource
export const deleteResourceAPI = async(id,reqHeader)=>{
    return await commomAPI('DELETE', `${serverURL}/deleteResource/${id}`, {},reqHeader)
}

//update user(advertiser)
export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commomAPI('PUT', `${serverURL}/updateUser`,reqBody,reqHeader,)
}

//get advertiser
export const getAdvertiserAPI = async(reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/getAdvertiser`,{},reqHeader)
}

//Payment method
export const paymentAPI = async(reqBody,reqHeader)=>{
    return await commomAPI('PUT', `${serverURL}/makePayment`,reqBody,reqHeader)
}

//ADMIN-getAllUsers
export const getAllUserAPI = async(reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/getAllUsers`,{},reqHeader)
}

//ADMIN-getAdmin
export const getAdminAPI = async()=>{
    return await commomAPI('GET', `${serverURL}/getAdmin`,{},{})
}

//get Buy Resource(resource brought by a perticulat User)
export const getBuyResourceAPI = async(reqHeader)=>{
    return await commomAPI('GET', `${serverURL}/getBuyResource`,{},reqHeader)
}

//add review
export const addReviewAPI = async(reqBody, reqHeader) => {
     return await commomAPI('POST', `${serverURL}/addReview`,reqBody,reqHeader)
}

