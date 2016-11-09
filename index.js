'use strict'

const STREAM_TOKEN = '<INSERT-API-ACCESS-TOKEN-HERE>'
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
  url: `https://streamlabs.com/service/get-socket-token?token=${STREAM_TOKEN}&ts=${timestamp}`,
  json: true
}, (err, res, data) => {
  let token = data.token

  console.log('Connecting to websocket')
  let twitchAlerts = io('http://io.twitchalerts.com:4567', {query: {token}})

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
