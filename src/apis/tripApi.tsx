import axios from 'axios'

const getTripInfo = async () => {
  const response = await axios('src/data/mock_data.json')

  if (response.status === 200) {
    const { data } = response
    console.log(data)
    return data
  }
  return null
}

export default getTripInfo
