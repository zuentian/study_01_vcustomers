import Vue from 'vue'

export function login (params) {
  return Vue.http.post('/api/UserLogin/login', params || {})
}
