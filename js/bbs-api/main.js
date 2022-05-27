'use strict'
const host = 'http://13.231.86.212:20780'
const p = console.log
const register = async (host, registerName, registerBio, registerPassword) => {
    const registerHost = host + '/register'
    const postParams = {
        'name': registerName,
        'bio': registerBio,
        'password': registerPassword
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParams)
    }
    await fetch(registerHost, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        console.log(json)
        if (json["message"]) {
            const hoge = document.getElementById("test")
            hoge.innerHTML = 'メッセージ [ ' + json["message"] + ' ]'
        }
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const registerSubmit = document.getElementById("registerSubmit")
registerSubmit.addEventListener('click', () => {
    const registerName = document.getElementById("registerName").value
    const registerBio = document.getElementById("registerBio").value
    const registerPassword = document.getElementById("registerPassword").value
    register(host, registerName, registerBio, registerPassword)
})

const login = async (host, loginName, loginPassword) => {
    const loginHost = host + '/login'
    const postParams = {
        'name': loginName,
        'password': loginPassword
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParams)
    }
    await fetch(loginHost, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        console.log(json)
        console.log(json["token"])
        localStorage.setItem("token", json["token"])
        const token = localStorage.getItem("token")
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const loginSubmit = document.getElementById("loginSubmit")
loginSubmit.addEventListener('click', () => {
    const loginName = document.getElementById("loginName").value
    const loginPassword = document.getElementById("loginPassword").value
    login(host, loginName, loginPassword)
})

const logout = async (host, token) => {
    const logoutHost = host + '/logout'
    const postParam = 'Bearer ' + token
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': postParam
        }
    }
    await fetch(logoutHost, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        console.log(json)
        if (json["message"]) {
            const hoge = document.getElementById("test")
            hoge.innerHTML = 'メッセージ [ ' + json["message"] + ' ]'
        }
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const logoutSubmit = document.getElementById("logoutSubmit")
logoutSubmit.addEventListener('click', () => {
    const token = localStorage.getItem("token")
    console.log(token)
    logout(host, token)
})

const usersIdGet = async (host, token, id) => {
    const usersIdGettHost = host + '/users?'
    const url = new URL(usersIdGettHost)
    const postParam = 'Bearer ' + token
    const queryParam = new URLSearchParams({
        'id': id
    })
    const request = new Request(url + queryParam)
    const params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': postParam
        }
    }
    await fetch(request, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        if (json["message"]) {
            const hoge = document.getElementById("test")
            hoge.innerHTML = 'メッセージ [ ' + json["message"] + ' ]'
        }
        console.log(json)
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const usersIdGetSubmit = document.getElementById("usersIdGetSubmit")
usersIdGetSubmit.addEventListener('click', () => {
    const id = document.getElementById("usersIdGetId").value
    const token = localStorage.getItem("token")
    usersIdGet(host, token, id)
})

const usersGet = async (host, token, perPage, page, q) => {
    const usersGetHost = host + '/users?'
    const url = new URL(usersGetHost)
    const postParam = 'Bearer ' + token
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
            'Authorization': postParam
        }
    }
    await fetch(request, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        if (json["message"]) {
            const hoge = document.getElementById("test")
            hoge.innerHTML = 'メッセージ [ ' + json["message"] + ' ]'
        }
        console.log(json)
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const usersGetSubmit = document.getElementById("usersGetSubmit")
usersGetSubmit.addEventListener('click', () => {
    const q = document.getElementById("usersGet").value
    const perPage = document.getElementById("perPageGet").value
    const page = document.getElementById("pageGet").value
    const token = localStorage.getItem("token")
    usersGet(host, token, perPage, page, q)
})

const usersDelete = async (host, token) => {
    const usersDeleteHost = host + '/users'
    const postParam = 'Bearer ' + token
    const params = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': postParam
        }
    }
    await fetch(usersDeleteHost, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        if (json["message"]) {
            const hoge = document.getElementById("test")
            hoge.innerHTML = 'メッセージ [ ' + json["message"] + ' ]'
        }
        console.log(json)
        localStorage.removeItem("token")
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const usersDeleteSubmit = document.getElementById("usersDeleteSubmit")
usersDeleteSubmit.addEventListener('click', () => {
    const token = localStorage.getItem("token")
    usersGet(host, token)
})

const usersEdit = async (host, token, bio) => {
    const usersEditHost = host + '/users'
    const postParam = 'Bearer ' + token
    const bodyParam = {
        'bio': bio
    }
    const params = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': postParam
        },
        body: JSON.stringify(bodyParam)
    }
    await fetch(usersEditHost, params)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .then(json => {
        if (json["message"]) {
            const hoge = document.getElementById("test")
            hoge.innerHTML = 'メッセージ [ ' + json["message"] + ' ]'
        }
        console.log(json)
      })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
}
const usersEditSubmit = document.getElementById("usersEditSubmit")
usersEditSubmit.addEventListener('click', () => {
    const bio = document.getElementById("usersEdit").value
    const token = localStorage.getItem("token")
    usersEdit(host, token, bio)
})
