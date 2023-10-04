import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilterImages } from "./filter_images";

export const NavBar = () => {
    const dropdownType = "order by"
    const [dropdownBy, setDropdownBy] = useState('');
    const navigate = useNavigate();

    const one = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setDropdownBy((e.target as HTMLElement).innerHTML);
    }

    return <div>
        <nav className="navbar bg-body-tertiary position-fixed top-0 z-1 w-100">
            <div className="container-fluid">
                {/* <Link to="show-images" className="navbar-brand">Photo cloud</Link> */}
                <Link to="show-images" className="navbar-brand d-flex align-items-center">
                    <img className="w-40px h-30px  my-0" src="../src/assets/blue PC cloud.png"></img>
                    <span>Photo cloud</span>
                </Link>
               <div className="d-flex ">
                <Link to="show-images" className="nav-link active m-2"><i className="bi bi-images mx-1"></i>images</Link>
                <Link to="show-categories" className="nav-link active m-2"><i className="bi bi-tags-fill mx-1"></i>categories</Link>
                <Link to="show-persons" className="nav-link active m-2"><i className="bi bi-people-fill mx-1"></i>people</Link>
              </div>
                <FilterImages />

                {/* <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        {dropdownType} {dropdownBy}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li><p onClick={e=>one(e)}>1</p></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div> */}
                <div >
                <button className="btn btn-outline-secondary  mx-2" onClick={() => navigate("upload-images")}>upload images</button>
                    <button className="btn btn-outline-secondary btn-sm mx-2" onClick={() => navigate("add-person")}>add person</button>
                    <button className="btn btn-outline-secondary btn-sm mx-2" onClick={() => navigate("add-category")}>add category</button>
                </div>
            </div>
        </nav>
    </div>
}