
export const DetailsImage = (props: any) => {

    const image: Image = props.image;
    return <div>
        <button title="details" className="btn" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseDelails" + image.idimage}  >
            <i className="bi bi-list"></i>
        </button>
        <div>
            <div className="collapse collapse-horizontal " id={"collapseDelails" + image.idimage}>
                <div className=" fs-small z-3 position-absolute card card-body w-15vw ">
                    <div className="text-start"><i className="bi bi-card-image"></i> {image.image_name}</div>
                    <div className="text-start"><i className="bi bi-tags-fill mx-1"></i> {image.category?.category_description}</div>
                    <hr />
                   <div >{image._.map((p) => <p className="text-start" key={p.idperson}> <i className="bi bi-person-check-fill"></i> {p.person_name}<br/> </p>)}</div> 
                   {!image._[0]&&<i className="fs-5 bi bi-person-fill-slash"></i>}
                </div>
            </div>
        </div>

    </div>
}