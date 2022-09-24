import { VQA } from "./apis";
import { getRandomInt } from "./helpers"

/**
 * Get the total number of images in a data split
 *
 * @param {string} split
 */
export async function getMaxNoOfImages(split) {
    try {
        let response = await fetch(VQA)
        let data = await response.json()
        return data.max_images
    } catch (err) {
        throw err
    }
}

export async function getDataPoint(split, imageIndex) {
    return imageIndex
}

export async function getRandomDataPoint(split, maxImages = null) {
    if (!maxImages)
        maxImages = await getMaxNoOfImages(split)
    let imageIndex = getRandomInt(1, maxImages+1)
    return await getDataPoint(split, imageIndex)
}
