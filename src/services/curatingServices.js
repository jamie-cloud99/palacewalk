import axios from 'axios'
const { VITE_JSON_SERVER } = import.meta.env

const fetchCuratingInfo = async (url) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchCollectionsAll = async () => {
  const apiUrl = `${VITE_JSON_SERVER}collections`
  try {
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchCuratingsAll = async () => {
  const apiUrl = `${VITE_JSON_SERVER}curatings`

  try {
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchCurating = async (id) => {
  const apiUrls = [
    `${VITE_JSON_SERVER}curatings/${id}`,
    `${VITE_JSON_SERVER}curatingCollections?curatingId=${id}`
  ]
  try {
    const resList = await Promise.all(apiUrls.map(fetchCuratingInfo))
    return resList.flat()
  } catch (error) {
    console.log(error)
  }
}
