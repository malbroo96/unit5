// delay.js
function delayMessage(message, time) {
  return new Promise((resolve, reject) => {
    if (!message || isNaN(time)) {
      return reject(new Error("Invalid parameters"));
    }
    setTimeout(() => {
      resolve(message);
    }, time);
  });
}

module.exports = delayMessage;
