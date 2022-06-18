'use strict'
const host = 'http://35.72.4.134:20780'
const registerHost = host + '/register'
const loginHost = host + '/login'
const logoutHost = host + '/logout'
const usersHost = host + '/users'
const threadsHost = host + '/threads'

const getToken = () => {
    const token = localStorage.getItem("token")
    const param = 'Bearer ' + token
    return param
}

const executeApi = async (request, params, pressedButtonId) => {
    await fetch(request, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
            setErrorMessage('サーバーエラー')
        }
        return response.json()
    })
    
    .then(data => {
        setMessage(data, pressedButtonId)
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
    const pressedButtonId = 'registerSubmit'
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
    await executeApi(registerHost, params, pressedButtonId)
}

const loginUser = async (name, password) => {
    const pressedButtonId = 'loginSubmit'
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
    executeApi(loginHost, params, pressedButtonId)
}

const logoutUser = async () => {
    const pressedButtonId = 'logoutSubmit'
    const token = getToken()
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(logoutHost, params, pressedButtonId)
}

const getUser = async (id) => {
    const pressedButtonId = 'usersIdGetSubmit'
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
    await executeApi(request, params, pressedButtonId)
}

const getUsers = async (perPage, page, q) => {
    const pressedButtonId = 'usersGetSubmit'
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
    await executeApi(request, params, pressedButtonId)
}

const deleteUser = async () => {
    const pressedButtonId = 'usersDeleteSubmit'
    const token = getToken()
    const params = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(usersHost, params, pressedButtonId)
}

const editBioUser = async (bio) => {
    const pressedButtonId = 'usersEditSubmit'
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
    await executeApi(usersHost, params, pressedButtonId)
}

const newThread = async (title) => {
    const pressedButtonId = 'threadsPostSubmit'
    const token = getToken()
    const bodyParams = {
        'title': title
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(bodyParams)
    }
    executeApi(threadsHost, params, pressedButtonId)
}

const getThreads = async (perPage, page, q) => {
    const pressedButtonId = 'threadsGetSubmit'
    const token = getToken()
    const url = new URL(threadsHost)
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
    await executeApi(request, params, pressedButtonId)
}

const getThread = async (id) => {
    const pressedButtonId = 'threadGetSubmit'
    const token = getToken()
    const url = new URL(threadsHost)
    const request = new Request(url + '/' + id)
    const params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    await executeApi(request, params, pressedButtonId)
}

const editThread = async (id, title) => {
    const pressedButtonId = 'threadEditSubmit'
    const token = getToken()
    const url = new URL(threadsHost)
    const request = new Request(url + '/' + id)
    const bodyParam = {
        'title': title
    }
    const params = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(bodyParam)
    }
    await executeApi(request, params, pressedButtonId)
}
