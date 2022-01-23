const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

const directory = `${__dirname}/uploads/`;


setInterval(deleteTrash, 43200000);

function deleteTrash() {

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});


exec("rm -rf ~/.local/share/Trash/*", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

}