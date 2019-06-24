import Cookies from 'js-cookie'
const TokenKey = 'ACCESS_TOKEN'
export function setToken(token) {
    return Cookies.set(TokenKey, token)
  }