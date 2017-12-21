const fs = require('fs');

'use strict';

// in this file you can append custom step methods to 'I' object

const loadFixture = function(filePath, fileName) {
    return fs.readFileSync(`tests/fixtures/${filePath}/${fileName}`).toString();
}

module.exports = function() {
  return actor({

    checkFile: function(filePath, fileName) {
        if (filePath === 'views') {
            this.amInPath('dist');
        } else {
            this.amInPath(`dist/${filePath}`);
        }

        this.seeFile(fileName);
        this.seeFileContentsEqual(loadFixture(filePath, fileName));
    }

  });
}
