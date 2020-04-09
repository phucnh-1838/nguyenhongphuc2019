document.addEventListener('DOMContentLoaded', function () {
   let socket = io.connect('http://'+document.domain+':'+location.port);
   let roomDefault='news';
   joinRoom(roomDefault);

   document.getElementById('reply-send-msg').onclick = function () {
       let msg = document.getElementById('comment');
       let username = document.getElementsByClassName('heading-name-meta')[0].innerText;
       socket.emit('payload', {'msg': msg.value, 'username': username, 'room': roomDefault});
       msg.value = ''
   };

   socket.on('message', function (msg) {
       if(msg.has_join === 'true'){
           msg.messages_in_room.forEach(function (mess) {
               printUserMessage(mess)
           });
           printUserMessage(msg);
           scrollDownChatWindow();
           return;
       };
       if(msg.has_join === 'false'){
           printUserMessage(msg);
           scrollDownChatWindow();
           return;
       };
       printUserMessage(msg);
       scrollDownChatWindow();
   });


   document.querySelectorAll('.select-room').forEach(function (room) {
       let newRoom = room.id;
       room.onclick = function () {
            if (newRoom == roomDefault){
                let msg = 'You are staying at this room';
                printSysMessage(msg);
            }
            else {
                leaveRoom(roomDefault);
                joinRoom(newRoom);
                roomDefault = newRoom
            }
       }
   });

   function leaveRoom(room) {
       let username = document.getElementsByClassName('heading-name-meta')[0].innerText;
       let conversation = document.getElementById('conversation');
       socket.emit('leave', {'username': username, 'room': room});
       conversation.innerHTML = '';
       document.querySelector('#' + CSS.escape(room)).style.color = "#ffc107";
       document.querySelector('#' + CSS.escape(room)).style.backgroundColor = "white";
       document.querySelector("#comment").focus();
   };

   function joinRoom(room) {
       let username = document.getElementsByClassName('heading-name-meta')[0].innerText;
       let conversation = document.getElementById('conversation');
       socket.emit('join', {'username': username, 'room': room});
       conversation.innerHTML = '';
       document.querySelector('#' + CSS.escape(room)).style.color = "#ffc107";
       document.querySelector('#' + CSS.escape(room)).style.backgroundColor = "#dcf8c6";
       document.querySelector("#comment").focus();
   };

   function scrollDownChatWindow() {
       const chatWindow = document.querySelector("#conversation");
       chatWindow.scrollTop = chatWindow.scrollHeight;
   };

   function printSysMessage(msg) {
        let message = '<div class="row message-body">' +
           '  <div class="col-sm-12 message-main-sender">' +
           '    <div class="sender">' +
           '      <div class="message-text">' + msg +
           '      </div>' +
           '    </div>' +
           '  </div>' +
           '</div>';
        let conversation = document.getElementById('conversation');
        conversation.insertAdjacentHTML('beforeend', message);
   }

   function printUserMessage(msg) {
       let username = document.getElementsByClassName('heading-name-meta')[0].innerText;
       if(msg.username == username){
           let message = '<div class="row message-body">' +
           '  <div class="col-sm-12 message-main-receiver">' +
           '    <div class="receiver">' +
           '      <div class="message-text">' + msg.msg +
           '      </div>' +
           '      <span class="message-time pull-right">' + msg.username +
           '      </span>' + ' <span class="message-time pull-right">' + msg.time_stamp +
           '      </span>' +
           '    </div>' +
           '  </div>' +
           '</div>';
           let conversation = document.getElementById('conversation');
           let room = document.getElementById(msg.room).getElementsByClassName('time-meta');
           room[0].innerText = msg.time_stamp;
           conversation.insertAdjacentHTML('beforeend', message);
       }
       else {
           let message = '<div class="row message-body">' +
           '  <div class="col-sm-12 message-main-sender">' +
           '    <div class="sender">' +
           '      <div class="message-text">' + msg.msg +
           '      </div>' +
           '      <span class="message-time pull-right">' + msg.username +
           '      </span>' + ' <span class="message-time pull-right">' + msg.time_stamp +
           '      </span>' +
           '    </div>' +
           '  </div>' +
           '</div>';
           let conversation = document.getElementById('conversation');
           conversation.insertAdjacentHTML('beforeend', message);
       };
   }
});