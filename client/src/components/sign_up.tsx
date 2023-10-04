

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "../axios";
import config from "../config";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Sign_up = () => {
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate()

    const sign_up = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isStrongPassword(pwd) && userName.length > 1) {
            console.log("sign_up");
            try {
                const response = await axios.post(`${config.api}auth/signup`, {
                    name: userName,
                    password: pwd,
                    email: email
                })

                sessionStorage.setItem("access_token", response.data?.access_token);
                navigate("/home/show-images");
            } catch (e: any) {
                console.log(e);
                alert(e.response?.data.message);
            }
        } else {
            alert("One of the details is wrong!")
        }


    }
    const isStrongPassword = (password: string): boolean => {
        // Regular expressions to check for a strong password
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;

        // Check if the password meets the requirements
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasNumber = numberRegex.test(password);

        return (
            hasUppercase &&
            hasLowercase &&
            hasNumber &&
            password.length >= 8
        );
    }


    return <div>
         <div className="m-5">
            <p className="fs-6 text-light float-end claer-right m-0 ts-black">Already have an account?</p><br/>
            <p className="fs-6 text-light float-end claer-right m-0 ts-black">Enter here and upload your photos!</p><br/>
            <Link className="float-end nav-link active text-white  fs-3 claer-right text-decoration-underline" to="/sign-in">sign in <i className="bi bi-box-arrow-in-right mx-2"></i></Link>
        </div>
        <div className="card card-frame mt-0 bg-white bg-opacity-50  ">
            <h3>sign up</h3>
            <form onSubmit={e => sign_up(e)}>
                <div className="form-floating py-3">
                    <input type="text" className="form-control" id="userName" placeholder="user name" name="userName"
                        value={userName} onChange={e => setUserName(e.target.value)} required />
                    <label htmlFor="userName">user name</label>
                    {userName.length < 2 &&
                        <p className="text-danger float-start">
                            Please enter a username of at least 2 characters.
                        </p>}
                </div>

                <div className="form-floating my-3 ">
                    <input type="password" className="form-control" id="pwd" placeholder="password" name="pwd"
                        value={pwd} onChange={e => setPwd(e.target.value)} required />
                    <label htmlFor="pwd">password</label>
                    {!isStrongPassword(pwd) &&
                        <p className="text-danger float-start">
                            Please enter a strong password.
                        </p>}

                </div>
                <div className="form-floating my-3">
                    <input type="email" className="form-control" id="email" placeholder="email" name="email"
                        value={email} onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="email">email</label>
                </div>
                <button type="submit" className="btn btn-light" >sign up</button>
            </form>
        </div>
    </div>

}  