const express = require("express");
const mongoose = require("mongoose");
const File = require("../models/file");
const app = express();
const multer = require("multer"); // for upload file

// const storage = multer.diskStorage({ ////for disk storage
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Customize the filename
//   }
// });

const storage = multer.memoryStorage(); ////for db storage
const upload = multer({ storage });


app.set('view engine', 'ejs');
app.set('views', './page');

const AdmZip = require("adm-zip");

const dburl = "mongodb+srv://ahmad:123@node.7b4h5et.mongodb.net/db?retryWrites=true&w=majority&appName=node";
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB");
}).catch((err) => console.log(err));

app.listen("4000", () =>
    console.log("app is listening to port 4000 !"));

app.get('/', (req, res) => {
    res.render("file", { size: null });
});
app.post("/uploadFile", upload.single("file11"), async (req, res) => {
    const zip = new AdmZip();
    zip.addFile(req.file.originalname, req.file.buffer);
    const zip_buffer = zip.toBuffer();
    const filedata = new File({
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: zip_buffer.length,
        data: zip_buffer,
    });
    if (filedata.size >= 100 * 1024 * 1024) {
        const error_message = "The Size Is Too Big !!!";
        return res.render("file", { size: error_message });
    }
    await filedata.save();
    await File.find().then((result) => {
        res.render("allFiles", { files: result });
    }).catch((err) => console.log(err));
});

app.get("/download/:id", async (req, res) => {
    const id = req.params.id;
    await File.findById(id).then((file) => {
        res.set({
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${file.originalName}.zip"`
        });
        res.send(file.data);

    }).catch(err => console.log(err));
})