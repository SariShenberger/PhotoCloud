import { useNavigate } from "react-router-dom"

export const Welcome = () => {
    const navigate = useNavigate();
    return <div className="p-4 d-flex">
        <div className="w-50">
            <img className="w-30vw ts-white" src="../src/assets/blue PC cloud.png"></img>
            <h1 className="text-white ts-black fs-5vw">Photo cloud</h1>
            <h3 className="text-white ts-black">Storage for your photos</h3>
        </div>
        <div className="mx-5 text-break">
            <p className="text-light  fst-italic ts-black fs-3">
                <span className="fs-1">Welcome to photo cloud!</span><br/>
                The site that keeps your photos.<br/>
                photo cloud was created with the aim of giving you the opportunity to save your photos, without the need for storage space on your computer.
                And in order to give quick and easy access to your photos from any computer. for free!<br/>
                We put special emphasis on how to use and manage images. Convenience search option.
                Connections by people, sorting by categories and more.

                We hope that photo cloud will be useful to you, and that you will enjoy it.<br/>
                photo cloud.
            </p>

            <button className="btn btn-light btn-lg mt-2 shadow-lg p-3  bg-body-tertiary rounded" onClick={() => navigate('/sign-in')}>Get started!</button>
        </div>
    </div>
}