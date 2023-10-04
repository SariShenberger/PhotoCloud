import { AddCategoryDialog } from "./add_category_dialog";
import { ShowOneCategory } from "./show_one_category";
import { useSelector } from "react-redux";

export const SelectAllCategories = (props: any) => {
    const category: Category = props.category;
    const setCategory = props.setCategory;
    const arrCategories: Category[] = useSelector((state: any) =>
        state.categoriesSlice.categories
    );
    return <div className="w-100">
        {!category && <p className="float-start h-10 m-0 text-danger fs-3">*</p>}
        <label className="float-start fs-5 mb-1" >select category:</label><br />
        <p className="float-start clear-left fs-small  mb-1" >The images that will now be uploaded will all be saved under the category you choose.</p>

        <button type="button" className="btn btn-light buttonDropdown g-col-6 g-col-md-4 dropdown-toggle button w-100" data-bs-toggle="dropdown" aria-expanded="false">
            {category ? category.category_description : "category"}

        </button> 
        <ul className="dropdown-menu selectCategory w-40vw">
            {arrCategories?.map((c: Category) =>
                <div>
                    <div className="dropdown-item d-flex" key={c.idcategory} onClick={() => { setCategory(c) }}>
                        <ShowOneCategory setCategory={setCategory} category={c} />
                    </div>
                    <hr className="dropdown-divider" />
                </div>
            )}
            <div className="dropdown-item" >
                     <AddCategoryDialog/>
                    </div>
        </ul>
    </div>
}