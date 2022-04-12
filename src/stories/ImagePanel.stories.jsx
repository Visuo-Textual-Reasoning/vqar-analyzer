import ImagePanel from "../components/ImagePanel/Index"

export default {
    title: "Image Panel",
    component: ImagePanel
}

export const Sample = () => <ImagePanel maxImages={2} imageIndex={1} setImageIndex={(e) => {}}/>