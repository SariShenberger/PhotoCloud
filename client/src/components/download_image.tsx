import axios from 'axios';
import { saveAs } from 'file-saver'
import DownloadLink from "react-download-link";
import fileDownload from 'js-file-download'

export const DownloadImage = (props: any) => {
  const img: Image = props.image;

  
  const handleDownload = (url: string, filename: string) => {
    console.log("url:",url);
    fileDownload(url, `${filename}.jpg`);
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        console.log("res",res);
        fileDownload(res.data, filename)
      }).catch((err) =>
        console.log(err))
  }
  return <div>
    <button title="download" className="btn" onClick={() => handleDownload(img.image_url, img.image_name)}><i className="bi bi-download"></i></button>
  </div>

}