import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

async function getGasPrice() {
    const response = await fetch('https://www.gasnow.org/api/v3/gas/price?utm_source=:line-noti-gas', {
        method: 'GET',
    })
    const data = await response.json()
    console.log('response', data)

    return data
}

async function notify() {
    const token = process.env.LINE_NOTI_TOKEN
    const form = new URLSearchParams()
    const gas = await getGasPrice()
    const gasGwei = gas.data.fast/1000000000
    if (gasGwei <= 200) {
        form.append('message', `สุลต่านไทม์ Gwei: ${gasGwei}`)
        const response = await fetch('https://notify-api.line.me/api/notify', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ` + token
            },
            body: form
        })
        // const data = await response.json()
    }
    // console.log('response', data)
}

async function run() {
    // await notify()
    // await getGasPrice()
    setInterval(notify, 15000)
}

run()

