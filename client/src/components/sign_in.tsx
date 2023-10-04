import { ChangeEvent, FormEvent, useState } from "react";
import axios from "../axios";
import config from "../config";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Sign_in = () => {
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    const sign_in = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.api}auth/signin`, {
                name: userName,
                password: pwd
            })

            sessionStorage.setItem("access_token", response.data?.access_token);
            navigate('/home/show-images');
        } catch (e: any) {
            console.log(e.response?.data.message)
        }

    }

    return <div >
        <div className="m-5">
            <p className="fs-6 text-light float-end claer-right m-0 ts-black">Don't have an account yet?</p><br/>
            <p className="fs-6 text-light float-end claer-right m-0 ts-black">Join here and upload your photos!</p><br/>
            <Link className="float-end nav-link active text-white  fs-3 claer-right text-decoration-underline" to="/sign-up">sign up<i className="bi bi-person-plus-fill mx-2 "></i></Link>
        </div><br />
        <div className=" card card-frame mt-0 bg-white bg-opacity-50">
            <h3>sign in</h3>
            <form onSubmit={e => sign_in(e)}>

                <div className="form-floating mb-3 mt-3">
                    <input type="text" className="form-control" id="userName" placeholder="user name" name="userName"
                        value={userName} onChange={e => setUserName(e.target.value)} required />
                    <label htmlFor="userName">user name</label>
                </div>

                <div className="form-floating mt-3 mb-3">
                    <input type="password" className="form-control" id="pwd" placeholder="password" name="pwd"
                        value={pwd} onChange={e => setPwd(e.target.value)} required />
                    <label htmlFor="pwd">password</label>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-light mx-2 " >sign in</button>
                </div>
            </form>
        </div>
    </div>

}  