let consoleLog =[];

logArea = document.querySelector('#console');
logCtx = logArea.getContext('2d')

function updateConsole() {
  logCtx.clearRect(0, 0, 512, 384);

  let consoleY = 380;

  for (let i = 0; i < consoleLog.length; i++) {
    if (consoleY <= 16) break;
    logCtx.fillStyle = "green";
    logCtx.font = 'bold 20px Sans';
    logCtx.fillText(`>${consoleLog[i]}`, 4, consoleY);

    consoleY -= 24;
  }
  //console.log(consoleLog);
};