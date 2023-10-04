
export const UploadImages = (props: any) => {
    
    const setImgFiles = props.setImgFiles;

    return <div className="mb-3 mt-2 w-100 ">
         {!props.imgFiles[0] && <p className="float-start  m-0 text-danger fs-3">*</p>}
        <label htmlFor="uploadImage" className="float-start fs-5 mb-1"  >upload images:</label><br/>
        <p className="float-start clear-left fs-small  mb-1" >You can now access the photos that will be uploaded, from anywhere.</p>
        <input name="uploadImage"  className="form-control" multiple type="file" id="formFile" onChange={(e) => {e.target.files?.length? setImgFiles(e.target.files): null }} />
    </div>


}