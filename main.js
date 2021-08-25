// make self invoke function
(function(){
  const sendBtn = document.querySelector("#send");
  const messages = document.querySelector("#messages");
  const messageBox = document.querySelector("#messagebox");

  let ws;
  function showMessage(message){
    messages.textContent += `\n\n${message}`;
    messages.scrollTop = messages.scrollHeight;
    messages.value = "";
  }

  function init(){
    if(ws){
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      console.log("Connection opened!");
    }
    ws.onmessage = ({data}) => showMessage(data);
    ws.onclose = () => {
      ws = null;
    }
  }

  sendBtn.onclick = () => {
    if(!ws){
      showMessage("No Websocket connection");
      return;
    }
    ws.send(messageBox.value);
    showMessage(messageBox.value);
  }

  init();
})();
