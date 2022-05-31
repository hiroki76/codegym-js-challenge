'use strict'
const host = 'http://18.181.196.57:20780'
const registerHost = host + '/register'
const loginHost = host + '/login'
const logoutHost = host + '/logout'
const usersHost = host + '/users?'

const registerSubmit = document.getElementById("registerSubmit")
registerSubmit.addEventListener('click', () => {
    const name = document.getElementById("registerName").value
    const bio = document.getElementById("registerBio").value
    const password = document.getElementById("registerPassword").value
    registerUser(registerHost, name, bio, password)
})

const loginSubmit = document.getElementById("loginSubmit")
loginSubmit.addEventListener('click', () => {
    const name = document.getElementById("loginName").value
    const password = document.getElementById("loginPassword").value
    loginUser(loginHost, name, password)
})

const logoutSubmit = document.getElementById("logoutSubmit")
logoutSubmit.addEventListener('click', () => {
    logoutUser(logoutHost)
})

const usersIdGetSubmit = document.getElementById("usersIdGetSubmit")
usersIdGetSubmit.addEventListener('click', () => {
    const id = document.getElementById("usersIdGetId").value
    getUserId(usersHost, id)
})

const usersGetSubmit = document.getElementById("usersGetSubmit")
usersGetSubmit.addEventListener('click', () => {
    const q = document.getElementById("usersGet").value
    const perPage = document.getElementById("perPageGet").value
    const page = document.getElementById("pageGet").value
    getUsers(usersHost, perPage, page, q)
})

const usersDeleteSubmit = document.getElementById("usersDeleteSubmit")
usersDeleteSubmit.addEventListener('click', () => {
    deleteUser(usersHost)
})

const usersEditSubmit = document.getElementById("usersEditSubmit")
usersEditSubmit.addEventListener('click', () => {
    const bio = document.getElementById("usersEdit").value
    editBioUser(usersHost, bio)
})
