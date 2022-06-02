'use strict'
const host = 'http://18.183.170.154:20780'
const registerHost = host + '/register'
const loginHost = host + '/login'
const logoutHost = host + '/logout'
const usersHost = host + '/users?'

const messageFunc = (message) => {
    const elementMessage = document.getElementById("message")
    elementMessage.innerHTML = 'メッセージ [ ' + message + ']'
}

const getToken = () => {
    const token = localStorage.getItem("token")
    const param = 'Bearer ' + token
    return param
}

const executeApi = async (host, params) => {
    await fetch(host, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        if (json["message"]) {
            messageFunc(json["message"]) 
        }
        if (json["token"]) {
            localStorage.setItem("token", json["token"]) 
        }
    })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}

const registerUser = async (name, bio, password) => {
    const bodyParams = {
        'name': name,
        'bio': bio,
        'password': password
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParams)
    }
    await executeApi(registerHost, params)
}

const loginUser = async (name, password) => {
    const bodyParams = {
        'name': name,
        'password': password
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParams)
    }
    executeApi(loginHost, params)
}

const logoutUser = async () => {
    const token = getToken()
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(logoutHost, params)
}

const getUserId = async (id) => {
    const token = getToken()
    const url = new URL(usersHost)
    const queryParam = new URLSearchParams({
        'id': id
    })
    const request = new Request(url + queryParam)
    const params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(request, params)
}

const getUsers = async (perPage, page, q) => {
    const token = getToken()
    const url = new URL(usersHost)
    const queryParams = new URLSearchParams({
        'per_page': perPage,
        'page': page,
        'name': q,
        'bio': q
    })
    const request = new Request(url + queryParams)
    const params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(request, params)
}

const deleteUser = async () => {
    const token = getToken()
    const params = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(usersHost, params)
}

const editBioUser = async (bio) => {
    const token = getToken()
    const bodyParam = {
        'bio': bio
    }
    const params = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(bodyParam)
    }
    await executeApi(usersHost, params)
}
