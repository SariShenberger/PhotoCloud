import { Outlet, useNavigate } from "react-router-dom"
import { NavBar } from "./nav_bar"
import { ReactElement, useEffect } from "react"
import { getAllCategoriesAPI } from "../api/category.api"
import { useDispatch } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"
import { getPersonsAPI } from "../api/person.api"
import { getImagesAPI } from "../api/image.api"


export const Home = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!sessionStorage.getItem('access_token')){
            navigate('/sign-in')
        }
        else{
        dispatch(getAllCategoriesAPI() as unknown as AnyAction);
        dispatch(getPersonsAPI() as unknown as AnyAction);
        dispatch(getImagesAPI() as unknown as AnyAction);
    }
    },[])
    return <div>
        <NavBar />
        <div className=" card card-frame bg-white bg-opacity-50 ">
            <Outlet />
        </div>
    </div>
}