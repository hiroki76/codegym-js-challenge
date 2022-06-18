'use strict'
const elementMessage = document.getElementById("messageTitle")
const elementMessageContent = document.getElementById("messageContent")
const elementErrorMessage = document.getElementById("errorMessage")
const elementContentTitle = document.getElementById("contentTitle")
const elementContent = document.getElementById("content")

const registerSubmit = document.getElementById("registerSubmit")
registerSubmit.addEventListener('click', () => {
    const name = document.getElementById("registerName").value
    const bio = document.getElementById("registerBio").value
    const password = document.getElementById("registerPassword").value
    setElementReset()
    registerUser(name, bio, password)
})

const loginSubmit = document.getElementById("loginSubmit")
loginSubmit.addEventListener('click', () => {
    const name = document.getElementById("loginName").value
    const password = document.getElementById("loginPassword").value
    setElementReset()
    loginUser(name, password)
})

const logoutSubmit = document.getElementById("logoutSubmit")
logoutSubmit.addEventListener('click', () => {
    setElementReset()
    logoutUser()
})

const usersIdGetSubmit = document.getElementById("usersIdGetSubmit")
usersIdGetSubmit.addEventListener('click', () => {
    const id = document.getElementById("usersIdGetId").value
    setElementReset()
    getUser(id)
})

const usersGetSubmit = document.getElementById("usersGetSubmit")
usersGetSubmit.addEventListener('click', () => {
    const q = document.getElementById("usersGet").value
    const perPage = document.getElementById("perPageGet").value
    const page = document.getElementById("pageGet").value
    setElementReset()
    getUsers(perPage, page, q)
})

const usersDeleteSubmit = document.getElementById("usersDeleteSubmit")
usersDeleteSubmit.addEventListener('click', () => {
    setElementReset()
    deleteUser()
})

const usersEditSubmit = document.getElementById("usersEditSubmit")
usersEditSubmit.addEventListener('click', () => {
    const bio = document.getElementById("usersEdit").value
    setElementReset()
    editBioUser(bio)
})

const threadsPostSubmit = document.getElementById("threadsPostSubmit")
threadsPostSubmit.addEventListener('click', () => {
    const title = document.getElementById("threadsPostTitle").value
    setElementReset()
    newThread(title)
})

const threadsGetSubmit = document.getElementById("threadsGetSubmit")
threadsGetSubmit.addEventListener('click', () => {
    const perPage = document.getElementById("threadsGetPerPage").value
    const page = document.getElementById("threadsGetPage").value
    const q = document.getElementById("threadsGetQ").value
    setElementReset()
    getThreads(perPage, page, q)
})

const threadGetSubmit = document.getElementById("threadGetSubmit")
threadGetSubmit.addEventListener('click', () => {
    const id = document.getElementById("threadGet").value
    setElementReset()
    getThread(id)
})

const threadEditSubmit = document.getElementById("threadEditSubmit")
threadEditSubmit.addEventListener('click', () => {
    const id = document.getElementById("threadEditId").value
    const title = document.getElementById("threadEdit").value
    setElementReset()
    editThread(id, title)
})

const setErrorMessage = (message) => {
    elementMessage.innerHTML = 'メッセージ'
    elementErrorMessage.innerHTML = message
}

const setMessage = (data, pressedButtonId) => {
    if (pressedButtonId === 'registerSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        elementMessageContent.innerHTML = '新規登録に成功しました。'
        if (data["message"]) {
            elementMessageContent.innerHTML = data["message"]
        }
    }
    if (pressedButtonId === 'loginSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        elementMessageContent.innerHTML = 'ログインに成功しました。'
        if (data["message"]) {
            elementMessageContent.innerHTML = data["message"]
        }
    }
    if (pressedButtonId === 'logoutSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        elementMessageContent.innerHTML = 'ログアウトに成功しました。'
        if (data["message"]) {
            elementMessageContent.innerHTML = data["message"]
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessage.innerHTML = 'メッセージ'
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'usersIdGetSubmit') {
        if (!data["data"] && data["message"] === 'Unauthenticated.') {
            elementMessage.innerHTML = 'メッセージ'
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'usersGetSubmit') {
        if (!data["data"] && data["message"] === 'Unauthenticated.') {
            elementMessage.innerHTML = 'メッセージ'
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'usersDeleteSubmit') {
        if (data["message"]) {
            elementMessage.innerHTML = 'メッセージ'
            elementMessageContent.innerHTML = data["message"]
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessage.innerHTML = 'メッセージ'
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'usersEditSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        if (!data["message"]) {
            elementMessageContent.innerHTML = 'bioを書き換えました。'
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'threadsPostSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        if (!data["message"]) {
            elementMessageContent.innerHTML = 'スレッドを作成しました。'
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'threadGetSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        if (!data["message"]) {
            elementMessageContent.innerHTML = 'スレッドを取得しました。'
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'threadEditSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        if (!data["message"]) {
            elementMessageContent.innerHTML = 'スレッドを編集しました。'
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
    if (pressedButtonId === 'threadsGetSubmit') {
        elementMessage.innerHTML = 'メッセージ'
        if (!data["message"]) {
            elementMessageContent.innerHTML = 'スレッド一覧を取得しました。'
        }
        if (data["message"] === 'Unauthenticated.') {
            elementMessageContent.innerHTML = 'ログインしてください。'
        }
    }
}

const setContent = (data) => {
    elementContentTitle.innerHTML = '取得内容'
    elementContent.innerHTML = data
}

const setElementReset = () => {
    elementMessage.innerHTML = ''
    elementMessageContent.innerHTML = ''
    elementErrorMessage.innerHTML = ''
    elementContentTitle.innerHTML = ''
    elementContent.innerHTML = ''
}
