const { Client } = require('discord-rpc'),
      monitor = require('active-win');

const client = new Client({ transport: 'ipc' }),
      clientID = '513802765139574786';

var currentFile = null;

async function checkPhotoshop() {
  let window = monitor.sync();

  try {
    let appExtension = isWin() ? ".exe" : ".app";
    let processName = window.owner.name;
    let windowTitle = window.title;

    if (processName.toLowerCase() == `photoshop${appExtension}`) {
      if (windowTitle.includes('.psd') || windowTitle.includes('% (RGB/')) {
          let split = windowTitle.split('@');

          if (split[0] !== currentFile) {
            currentFile = split[0];
            updateRP(`Editing ${currentFile}`);
          }
      } else {
          if (currentFile !== "IDLE") {
            currentFile = 'IDLE';
            updateRP(null);
          }
      }
    }
  } catch(e) {
    console.log(e);
  }
}

function updateRP(status) {
  if (status == null) status = 'IDLE';  
  
  client.setActivity({
    details: 'CC 2018',
    state: status,
    startTimestamp: new Date(),
    largeImageKey: 'pslarge',
    smallImageKey: 'pssmall',
    largeImageText: 'Adobe Photoshop',
    smallImageText: 'Editing',
    instance: false
  });
  
  console.log(`> Updated Status: ${status}`);
}

function isWin() {
  if (process.platform == "win32") return true;
  return false;
}

client.on('ready', () => {
  console.log("> Connected to Discord using Photoshop Rich Presence!");

  setInterval(() => {
    checkPhotoshop();
  }, 15000);
});

client.login(clientID).catch(console.error);
