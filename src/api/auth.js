import Vue from 'vue'

export function login (params) {
  return Vue.http.post('common/AuthService/login', params || {})
}
