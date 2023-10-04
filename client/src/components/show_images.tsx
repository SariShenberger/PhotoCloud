import { ShowOneImage } from "./show_one_image";
import { useSelector } from "react-redux";

export const ShowImages = () => {

    const images: Image[] = useSelector((state: any) => {
        return state.imageSlice.filterImages;
    })

    return <div id="showImages">
        {images?.map((img: Image) => <ShowOneImage key={img.idimage} image={img} />)}
    </div>
}
