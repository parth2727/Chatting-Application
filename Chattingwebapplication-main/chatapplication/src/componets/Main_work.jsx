import React from 'react'
import Showchat from './Showchat'
import Chat from './Chat'
function Main_work() {
  return (
    <div class="container">
        <div class="col-4">
        <Showchat  sender="keyur@gmail.com" reciver="now12@gmail.com"/>
        </div>
        <div class="col-8">
        <Chat sender="keyur@gmail.com" reciver="now12@gmail.com"/>
        </div>
    </div>
  )
}

export default Main_work