import axios from "axios";

const insectApi = axios.create({baseURL: 'http://localhost:5000/api/insects'});
const cartApi = axios.create({baseURL: 'http://localhost:5000/api/carts'});

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

export async function getCarts() {
  try {
    const response = await cartApi.get('/');
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

export async function updateCartCount({insect_id, count, color}) {
  try {
    const response = await cartApi.post(`/`, {count, insect_id, color});
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

export async function deleteCart(id) {
  try {
    await cartApi.delete(`/${id}`);
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

