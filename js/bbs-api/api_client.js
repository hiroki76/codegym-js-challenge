'use strict'
const messageFunc = (message) => {
    const elementMessage = document.getElementById("message")
    elementMessage.innerHTML = 'メッセージ [ ' + message + ' ]'
}

const getToken = () => {
    const token = localStorage.getItem("token")
    const param = 'Bearer ' + token
    return param
}

const getFetch = async (host, params) => {
    await fetch(host, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        if (json["massage"]) {
        messageFunc(json["massage"]) 
        }
        if (json["token"]) {
            localStorage.setItem("token", json["token"]) 
        }
    })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}

const registerUser = async (host, name, bio, password) => {
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
    await getFetch(host, params)
}

const loginUser = async (host, name, password) => {
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
    getFetch(host, params)
}

const logoutUser = async (host) => {
    const token = getToken()
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await getFetch(host, params)
}

const getUserId = async (host, id) => {
    const token = getToken()
    const url = new URL(host)
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
    await getFetch(request, params)
}

const getUsers = async (host, perPage, page, q) => {
    const token = getToken()
    const url = new URL(host)
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
    await getFetch(request, params)
}

const deleteUser = async (host) => {
    const token = getToken()
    const params = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await getFetch(host, params)
}

const editBioUser = async (host, bio) => {
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
    await getFetch(host, params)
}
