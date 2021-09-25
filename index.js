import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

let lastGas = 0

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
    const gasGwei = Math.floor(gas.data.fast/1000000000)
    const gasDiff = Math.abs(lastGas - gasGwei)
    if (gasGwei <= 40 && (gasDiff >= 5)) {
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
        lastGas = gasGwei
    } else {
        if (gasDiff >= 5) {
            lastGas = gasGwei
        }
    }
    console.log('lastGas', lastGas)
    // console.log('response', data)
}

async function run() {
    // await notify()
    // await getGasPrice()
    setInterval(notify, 15000)
}

run()

