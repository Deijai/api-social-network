'use strict';
const fs = require('fs');

exports.removeOfUploads = (filePath) => {
    fs.unlink(filePath, (err) => {
        if(err){
          return res.status(404).json({ error: "Extension is not valid, check." });
        }
    });
}
