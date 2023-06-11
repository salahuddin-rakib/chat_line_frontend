import Axios from 'axios';

const BASE_URL = 'http://localhost:4000';
const auth_token = window.localStorage.getItem('auth_token');

export const GET = (url) => {
  return Axios.get(`${BASE_URL}${url}`, {
    headers: {
      Authorization: ` Token ${auth_token}`,
      Accept: "application/json"
    }
  })
}


export const DELETE = (url) => {
  return Axios.delete(`${BASE_URL}${url}`, {
    headers: {
      Authorization: ` Token ${auth_token}`,
      Accept: "application/json"
    }
  })
}

export const POST = (url, data) => {
  return Axios.post(`${BASE_URL}${url}`, data, {
    headers: {
      Authorization: ` Token ${auth_token}`,
      Accept: "application/json"
    }
  })
}

export const PUT = (url, data) => {
  return Axios.put(`${BASE_URL}${url}`, data, {
    headers: {
      Authorization: ` Token ${auth_token}`,
      Accept: "application/json"
    }
  })
}


export const PATCH = (url, data) => {
  return Axios.patch(`${BASE_URL}${url}`, data, {
    headers: {
      Authorization: ` Token ${auth_token}`,
      Accept: "application/json"
    }
  })
}