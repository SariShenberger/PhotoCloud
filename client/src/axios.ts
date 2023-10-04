import axios from "axios";

axios.interceptors.request.use((request)=>{
    request.headers.set("authorization",`Bearer ${sessionStorage.getItem("access_token")}`);
    return request;
})

export default axios;