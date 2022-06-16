'use strict'
const host = 'http://52.198.64.33:20780'
const registerHost = host + '/register'
const loginHost = host + '/login'
const logoutHost = host + '/logout'
const usersHost = host + '/users'

const getToken = () => {
    const token = localStorage.getItem("token")
    const param = 'Bearer ' + token
    return param
}

const executeApi = async (request, params, btn) => {
    await fetch(request, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
            setErrorMessage('サーバーエラー')
        }
        return response.json()
    })
    
    .then(data => {
        setMessage(data, btn)
        if (!data["token"]) {
            if (!data["status"]) {
                if (!data["message"]) {
                    setContent(JSON.stringify(data))
                    console.log(data)
                }
            }
        }
        if (data["token"]) {
            localStorage.setItem("token", data["token"]) 
        }
    })
    .catch(error => {
        console.error('通信に失敗しました', error)
        setElementReset()
        setErrorMessage('通信に失敗しました。')
    })
}

const registerUser = async (name, bio, password) => {
    const btn = 'registerSubmit'
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
    await executeApi(registerHost, params, btn)
}

const loginUser = async (name, password) => {
    const btn = 'loginSubmit'
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
    executeApi(loginHost, params, btn)
}

const logoutUser = async () => {
    const btn = 'logoutSubmit'
    const token = getToken()
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(logoutHost, params, btn)
}

const getUser = async (id) => {
    const btn = 'usersIdGetSubmit'
    const token = getToken()
    const url = new URL(usersHost)
    const request = new Request(url + '/' + id)
    const params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(request, params, btn)
}

const getUsers = async (perPage, page, q) => {
    const btn = 'usersGetSubmit'
    const token = getToken()
    const url = new URL(usersHost)
    const queryParams = new URLSearchParams({
        'per_page': perPage,
        'page': page,
        'q': q
    })
    const request = new Request(url + '?' + queryParams)
    const params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(request, params, btn)
}

const deleteUser = async () => {
    const btn = 'usersDeleteSubmit'
    const token = getToken()
    const params = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(usersHost, params, btn)
}

const editBioUser = async (bio) => {
    const btn = 'usersEditSubmit'
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
    await executeApi(usersHost, params, btn)
}
