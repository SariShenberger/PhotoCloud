import { useDispatch } from "react-redux"
import { deletePersonAPI } from "../api/person.api";
import { AnyAction } from "@reduxjs/toolkit";
import { getImagesAPI } from "../api/image.api";

export const DeletePerson = (props: any) => {

    const dispatch = useDispatch();
    const deletePersonOnClick = async () => {
        const result = confirm("Are you sure you want to delete this person?");
        if (result) {
            await dispatch(deletePersonAPI(props.id) as unknown as AnyAction);
            dispatch(getImagesAPI() as unknown as AnyAction);
            
            if (props.personsControlMap) {
                props.personsControlMap.delete(props.id);
                props.setPeople(Array.from(props.personsControlMap.values()));
            }

        }
    }
    return <div>
        <button title="drop" type="button" className="btn btn-light" onClick={() => deletePersonOnClick()}><i className="bi bi-trash3"></i></button>
    </div>
}