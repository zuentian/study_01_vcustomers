import Cookies from 'js-cookie'
const TokenKey = 'ACCESS_TOKEN'
export function setToken(token) {
    return Cookies.set(TokenKey, token,0)//0是设置浏览器关闭之后，cookie清除，不设置
  }

export function getToken(){
  return Cookies.get(TokenKey)||""
}

export function removeToken(){
  return Cookies.remove(TokenKey)
}