import { useState } from "react";
import { DeleteCategory } from "./delete_category"
import { UpdateCategoryDialogs } from "./update_category_dialogs";

export const ShowOneCategory = (props: any) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const category: Category = props.category;
    // props.setCategory(category);
   
    return <>
        <div className="dropdown-item float-end h-50px " onMouseOver={() => setIsShowOption(true)} onMouseLeave={() => setIsShowOption(false)}>
            <span className="d-flex justify-content-between">
            <label className="fs-5 "  >{category.category_description}</label>
            {isShowOption && <div className="d-flex align-items-start">
                    <UpdateCategoryDialogs setCategory={props.setCategory} category={category}/>
                    <DeleteCategory setCategory={props.setCategory} idCategory={category.idcategory} />
                </div>}
            
            </span>
        </div>
        
    </>
}