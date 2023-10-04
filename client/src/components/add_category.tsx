import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { addCategoryAPI } from "../api/category.api";
import { AnyAction } from "@reduxjs/toolkit";


export const AddCategory = () => {
    const dispatch = useDispatch();
    const [newCategoryDiscription, setNewCategoryDiscription] = useState("");

    const addCategoryOnclick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const category:Category={ category_description: newCategoryDiscription }
        dispatch(addCategoryAPI(category) as unknown as AnyAction ) ;
    }

    return <div>
        <h3>add category</h3>
        {/* <form onSubmit={addCategory}><DetailsCategory category={{category_description:""}}></DetailsCategory></form> */}

        <form id="newCategory" onSubmit={(event) => addCategoryOnclick(event)}>
            <div className="form-floating mb-3 mt-3 ">
                <input type="text" className="form-control" placeholder="enter new category" value={newCategoryDiscription} required name="category_description" onChange={(e) => setNewCategoryDiscription(e.target.value)} />
                <label htmlFor="category_description">new category</label>
            </div>
            <button type="submit" className="btn btn-light">add category</button>
        </form>
    </div>
}