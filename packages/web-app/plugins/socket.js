// import Vue from 'vue'
// import io from 'socket.io-client'
// import patch from 'socketio-wildcard'

// const server = process.env.MOONWS_SW

// export default ({ store }) => {
//   const socket = io(server)

//   const modules = [
//     'dice'
//   ] /* List of Vuex modules that want to receive Websocket messages as actions */

//   for (let mod of modules) {
//     // let subSocket = io(`${server}/${mod}`)
//     // patch(io.Manager)(subSocket)
//     // subSocket.on('*', ({ type, data }) => {
//     //   if (type != 2) return /* We want only normal message frames */
//     //   const [action, ...rest] = data
//     //   store.dispatch(`${mod}/${action}`, rest)
//     // })
//   }

//   Vue.mixin({
//     computed: {
//       $socket: () => socket
//     }
//   })
// }
