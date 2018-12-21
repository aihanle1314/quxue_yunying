import Cookies from 'js-cookie'

const TokenKey = 'Bclient-Token'
const UserIdKey = 'Bclient-UserId'
const UserHeaderKey = 'Bclient-UserHeader'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getUserId () {
  return Cookies.get(UserIdKey)
}

export function setUserId (uid) {
  return Cookies.set(UserIdKey, uid)
}

export function removeUserId () {
  return Cookies.remove(UserIdKey)
}

export function getUserHeader () {
  return Cookies.get(UserHeaderKey)
}

export function setUserHeader (header) {
  return Cookies.set(UserHeaderKey, header)
}

export function removeUserHeader () {
  return Cookies.remove(UserHeaderKey)
}