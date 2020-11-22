const venom = require('venom-bot');
const fs = require('fs');
const mime = require('mime-types');


venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
});


const start = (client) => {
  client.onMessage( async (message) => {
    if (message.isMedia === true || message.isMMS === true) {
      const buffer = await client.decryptFile(message);
      if(message.type === 'image' && message.caption.toLowerCase() === "sticker"){
        const fileName = `img.${mime.extension(message.mimetype)}`;
        await fs.writeFile(fileName, buffer, async (err) => {
            if(err) throw err;
            else{
              await client
              .sendImageAsSticker(message.from, './img.jpeg')
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
            }
        });
      }
    }
  })
}










