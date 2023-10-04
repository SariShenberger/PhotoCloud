import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { delCatregoryAPI } from "../api/category.api";
import { getImagesAPI } from "../api/image.api";


export const DeleteCategory = (props: any) => {
    const idCategory: number = parseInt(props.idCategory)
    const dispatch = useDispatch();
    const delCatregory = async () => {

        props.setCategory(undefined);
        const result = confirm(`Are you sure you want to delete this category?\n⚠ Worning!!!\nDeleting a category will delete all images belonging to that category!`);
        if (result) {
            await dispatch(delCatregoryAPI(idCategory) as unknown as AnyAction);
            dispatch(getImagesAPI() as unknown as AnyAction);

            if (props.setCategory){
                props.setCategory(undefined);
            }
        }
    }

    return <button title="drop" className="btn " onClick={() => delCatregory()}><i className="bi bi-trash3"></i></button>
}