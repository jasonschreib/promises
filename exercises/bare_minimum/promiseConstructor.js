/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  let promise = new Promise((resolve, reject) => {
    let readStream = fs.createReadStream(filePath, 'utf8');
    readStream
      .on('data', (chunk) => {
        let firstline = chunk.slice(0, chunk.indexOf('\n'));
        resolve(firstline);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  return promise;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  let promise = new Promise((resolve, reject) => {
    request(url, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.statusCode);
    });
  });

  return promise;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
