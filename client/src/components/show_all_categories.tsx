import { ShowOneCategory } from "./show_one_category";
import { useSelector } from "react-redux";

export const ShowAllCategories = () => {
    
    const arrCategories = useSelector((state: any) =>
        state.categoriesSlice.categories
    );
    return <div >
        <h3>show categories</h3>
        {arrCategories?.map((c: Category) =>
        <div className="card mt-2 p-3">
             <ShowOneCategory className="p-2" key={c.idcategory} category={c} />
        </div>
        
        
         )}
    </div>
}