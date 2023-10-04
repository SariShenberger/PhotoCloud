import { FormEvent, useState } from "react"
import { CheckboxPersons } from "./checkbox_persons"
import { SelectAllCategories } from "./select_all_categories"
import { ShowPersons } from "./show_persons"
import { UploadImages } from "./upload_images"
import { upload } from "../firebase/upload-fiels/storage_upload_file"
import { Category } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { addImageAPI } from "../api/image.api"
import { AnyAction } from "@reduxjs/toolkit"

export const AddImages = () => {

    const [imgFiles, setImgFiles]: any[] = useState([]);
    const [category, setCategory] = useState();
    const [people, setPeople] = useState([]);


    const dispatch = useDispatch();

    const addImages = () => {
        if (!imgFiles[0] || !category) {
            alert("The upload image and category fields are required fields!")
        }
        else {
            for (let imgFile of imgFiles) {
                addOneImg(imgFile);
            }
        }

    }
    const addOneImg = async (imgFile: any) => {
        if (imgFile.type.split('/')[0] === "image") {
            const url = await upload(imgFile);
            const image: Image = {
                image_name: imgFile.name,
                image_url: url,
                image_creation_date: imgFile.lastModifiedDate,
                category,
                _: people
            };
            console.log("img:",image);
            dispatch(addImageAPI(image) as unknown as AnyAction);
        }
    }
    return (
        <div>
            <h3>upload images</h3>
            <div className="row">
                <div className="col d-flex  flex-wrap align-content-stretch flex-row ">
                   
                    <UploadImages imgFiles={imgFiles} setImgFiles={setImgFiles} />
                    <SelectAllCategories category={category} setCategory={setCategory} />
                    <CheckboxPersons setPeople={setPeople} />
                </div>
                <div id="frame" data-bs-spy="scroll" className=" col frame d-flex justify-content-evenly align-items-center flex-wrap align-content-stretch flex-row overflow-y-auto">
                    {imgFiles[0] ?
                        Array.from(imgFiles)?.map((imgFile: any) => <img key={imgFile} src={URL.createObjectURL(imgFile)} />
                        ) : <i className="bi bi-file-earmark-image text-white  fs-20vw"></i>}

                </div >
            </div>
            <input onClick={async () => addImages()} className="btn btn-light w-65vw mx-auto mt-2 " type="button" value="upload" />
        </div>

    )
}
