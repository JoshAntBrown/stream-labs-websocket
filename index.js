'use strict'

const API_TOKEN = '<INSERT-LEGACY-API-KEY-HERE>'
const io = require('socket.io-client')
const request = require('request')

function logResult(eventName) {
  return function() {
    console.log(`Recieved event: ${eventName}`, arguments)
  }
}

console.log('Requesting socket token')
let timestamp = Date.now()
request({
  url: `https://streamlabs.com/service/get-socket-token?token=${API_TOKEN}&ts=${timestamp}`,
  json: true
}, (err, res, data) => {
  let token = data.token

  console.log('Connecting to websocket')
  let twitchAlerts = io(`https://aws-io.streamlabs.com?token=${token}`)

  twitchAlerts.on('connect', logResult('connect'))
  twitchAlerts.on('connect_error', logResult('connect_error'))
  twitchAlerts.on('connect_timeout', logResult('connect_timeout'))
  twitchAlerts.on('follows', logResult('follows'))
  twitchAlerts.on('subscriptions', logResult('subscriptions'))
  twitchAlerts.on('hosts', logResult('hosts'))
  twitchAlerts.on('alerts', logResult('alerts'))
  twitchAlerts.on('donations', logResult('donations'))
  twitchAlerts.on('bits', logResult('bits'))
})
