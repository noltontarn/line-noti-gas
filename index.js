import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

async function notify() {
    const token = process.env.LINE_NOTI_TOKEN
    const form = new URLSearchParams()
    form.append('message', 'test interval')
    const response = await fetch('https://notify-api.line.me/api/notify', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ` + token
        },
        body: form
    })
    console.log({
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ` + token
        },
        body: form
    })
    const data = await response.json()
    console.log('response', data)
}

async function run() {
    // await notify()
    setInterval(notify, 5000)
}

run()

