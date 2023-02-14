import fetch from "node-fetch";
export function isOffsale(item, callback) {
    fetch(item)
        .then((x => x.text()))
            .then(data => {
                if(!data.includes('>Purchase'))
                    callback.offSale()
                else
                    callback.onSale()
            })
}
export function logIn(name, password, token, callback, errorCallback) {

    fetch('https://www.brickplanet.com/login', {method: 'POST', body: {
        _token: token,
        username: name,
        password
    }})
    .then(
        (x) => { return {status: x.status, x, text: x.text()}}
    )
    .then(
        (data) => {
           if(data.status !== 302)  errorCallback(data)
           else{
            callback(data.x.headers.raw()['set-cookie'])
           }
        }
    )
}
export function buyItem(item, account, callback) {



}

export function getCsrf(callback) {
    fetch('https://www.brickplanet.com/login')
        .then(data => data.text())
        .then(page => {
                callback(page.split('_token')[1].split('"')[2])
        })
}