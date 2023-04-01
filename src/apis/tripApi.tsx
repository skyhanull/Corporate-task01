import axios from 'axios'

const getTripInfo = async () => {
  const response = await axios('mock_data.json')

  if (response.status === 200) {
    const { data } = response

    return data
  }
  return null
}

export default getTripInfo
