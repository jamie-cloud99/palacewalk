import axios from 'axios'
const { VITE_JSON_SERVER } = import.meta.env

export const fetchCuratingsAll = async () => {
  const apiUrl = `${VITE_JSON_SERVER}curatings`

  try {
    const res = await axios.get(apiUrl)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchCurating = async (id) => {
  const apiUrl = `${VITE_JSON_SERVER}curatings/${id}`
  try {
    const res = await axios.get(apiUrl)
    return res
  } catch (error) {
    console.log(error)
  }
}
