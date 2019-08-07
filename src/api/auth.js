import Vue from 'vue'

export function login (params) {
  return Vue.http.post('/api/UserLogin/login', params || {})
}
export function getCurrentUser (params) {
  return Vue.http.post('/api/UserLogin/getCurrentUser', params || {})
}
export function logout (params) {
  return Vue.http.post('/api/UserLogin/logout', params || {})
}