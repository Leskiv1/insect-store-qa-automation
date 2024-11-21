import axios from "axios";

const insectApi = axios.create({baseURL: 'http://localhost:5000/api/insects'});

export async function getInsects({
                                  nameSort='not',
                                  batchesSort='not',
                                  priceSort='not',
                                  typeFilter='all',
                                  nameFilter='',
                                  size}) {
  try {
    const response = await insectApi.get('/', {
      params: {
        batchesSort,
        priceSort,
        nameSort,
        typeFilter,
        nameFilter,
        size,
      }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
}

export async function getInsectById(id) {
  try {
    const response = await insectApi.get(`/${id}`);
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
}

