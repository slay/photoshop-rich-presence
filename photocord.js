const { Client } = require('discord-rpc'),
      monitor = require('active-win');

const client = new Client({ transport: 'ipc' }),
      clientID = '486564303915188244';

async function checkPhotoshop() {
  let window = monitor.sync();

  try {
    let appExtension = isWin() ? ".exe" : ".app";
    let windowTitle = window.title;

    // Still working on it...
  } catch(e) {
    console.log(e);
  }
}

function updateRP(editing) {
  client.setActivity({
    details: 'CC 2018',
    state: `Editing ${editing}`,
    startTimestamp: new Date(),
    largeImageKey: 'pslarge',
    smallImageKey: 'pssmall',
    largeImageText: 'Adobe Photoshop',
    smallImageText: 'Editing',
    instance: false
  });
}

client.on('ready', () => {
  console.log("> Connected to Discord using Photocord!");

  setInterval(() => {
    checkPhotoshop();
  }, 1000);
});

function isWin() {
  if (process.platform == "win32") return true;
  return false;
}

client.login(clientID).catch(console.error);
