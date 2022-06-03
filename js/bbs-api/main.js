'use strict'
const registerSubmit = document.getElementById("registerSubmit")
registerSubmit.addEventListener('click', () => {
    const name = document.getElementById("registerName").value
    const bio = document.getElementById("registerBio").value
    const password = document.getElementById("registerPassword").value
    registerUser(name, bio, password)
})

const loginSubmit = document.getElementById("loginSubmit")
loginSubmit.addEventListener('click', () => {
    const name = document.getElementById("loginName").value
    const password = document.getElementById("loginPassword").value
    loginUser(name, password)
})

const logoutSubmit = document.getElementById("logoutSubmit")
logoutSubmit.addEventListener('click', () => {
    logoutUser()
})

const usersIdGetSubmit = document.getElementById("usersIdGetSubmit")
usersIdGetSubmit.addEventListener('click', () => {
    const id = document.getElementById("usersIdGetId").value
    getUserId(id)
})

const usersGetSubmit = document.getElementById("usersGetSubmit")
usersGetSubmit.addEventListener('click', () => {
    const q = document.getElementById("usersGet").value
    const perPage = document.getElementById("perPageGet").value
    const page = document.getElementById("pageGet").value
    getUsers(perPage, page, q)
})

const usersDeleteSubmit = document.getElementById("usersDeleteSubmit")
usersDeleteSubmit.addEventListener('click', () => {
    deleteUser()
})

const usersEditSubmit = document.getElementById("usersEditSubmit")
usersEditSubmit.addEventListener('click', () => {
    const bio = document.getElementById("usersEdit").value
    editBioUser(bio)
})

const messageFunc = (json) => {
    const elementMessage = document.getElementById("messageTitle")
    elementMessage.innerText = 'メッセージ'
    const elementMessageContent = document.getElementById("messageContent")
    elementMessageContent.innerHTML = json["message"]
}

const addContent = (json) => {
    const elementContentTitle = document.getElementById("contentTitle")
    elementContentTitle.innerText = '取得内容'
    const elementContent = document.getElementById("content")
    elementContent.innerText = JSON.stringify(json)
}
