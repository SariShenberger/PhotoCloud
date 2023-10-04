import { useState } from "react";
import { CheckboxPersons } from "./checkbox_persons";
import { useDispatch } from "react-redux";
import { SelectAllCategories } from "./select_all_categories";
import { updateImageAPI } from "../api/image.api";
import { AnyAction } from "@reduxjs/toolkit";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

export const UpdateImage = () => {
    const location = useLocation();
    const img: Image = location.state.image;
    console.log(img);
    const [newName, setNewName] = useState(img.image_name);
    const [category, setCategory] = useState(img.category);
    const [people, setPeople]: any[] = useState(img._);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateImage = () => {
        const image: Image = {
            image_name: newName,
            image_url: img.image_url,
            image_creation_date: img.image_creation_date,
            category: img.category, _: people
        };
        console.log("updating:", image);
        const obj = { id: img.idimage || 0, image };
        dispatch(updateImageAPI(obj) as unknown as AnyAction)
    }

    return <div>
        <h3>update image</h3>
        <div className="row">
            <div className="col d-flex  flex-wrap align-content-stretch flex-row ">
                <div>
               
                <label htmlFor="name" className="float-start fs-5 mb-1" >enter new name:</label><br/>
                <p className="float-start clear-left fs-small  mb-1" >The image you update now will be saved under the new name.</p>
                <div className="d-flex form-floating mb-3 mt-3 w-40vw">
                    <input type="text" className="form-control " id="name" placeholder="new name" name="name"
                        value={newName} onChange={e => setNewName(e.target.value)} required />
                    <label htmlFor="name">new name</label>
                </div> 
                   </div>
                <SelectAllCategories category={category} setCategory={setCategory} />
                <CheckboxPersons people={people} setPeople={setPeople} />
            </div>
            <div id="frame" data-bs-spy="scroll" className=" col frame d-flex justify-content-evenly align-items-center flex-wrap align-content-stretch flex-row overflow-y-auto">
                <img src={img.image_url}></img>
            </div>
        </div>
        <input onClick={async () => { await updateImage(); navigate("/home/show-images") }} className="btn btn-light w-65vw mx-auto mt-2 " type="button" value="update" />
    </div>
}
