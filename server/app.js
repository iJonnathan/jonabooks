const express = require("express")

//const fileUpload = require('express-fileupload')
//const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")

// const firebase = require('firebase/app').default;
// require('firebase/auth');
// require('firebase/database');

const admin = require('firebase-admin')
var serviceAccount = require("./jonabooks_firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'jonabooks.appspot.com'
});
const buckete = admin.storage().bucket()
const defaultBucketName = Object.keys(buckete);
console.log("bukete: "+defaultBucketName)

//admin.initializeApp(firebaseConfig);
// admin.initializeApp({
//     credential: admin.credential.cert(""),
//     storageBucket: "jonabooks.appspot.com"
//   })

// Cloud storage

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
  }))
const cors = require('cors');
app.use(cors());
//app.use(fileUpload())

// routes
app.get("/", (req,res)=>{
    res.send("my home page dey show sha")
})
// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'books_uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
//const upload = multer({storage: storage})
const upload = multer({
    storage: multer.memoryStorage()
})
//app.use(upload.any())
//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
});

function uploadBook(file){
    const blob = buckete.file(file.originalname)
        
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    })
    
    blobWriter.on('error', (err) => {
        console.log(err)
        return false
    })
    
    blobWriter.on('finish', () => {
        return true
    })
    
    blobWriter.end(file.buffer)
}
app.get('/books', async function (req, res, next){
    const options = {
        destination: './books_uploads/1911 History of Vermilion County IL Vol-1a.pdf',
    };
    await buckete.file('1911 History of Vermilion County IL Vol-1a.pdf').download(options);
     //storage.bucket(bucketName).file(fileName).download(options);


})
app.post('/books', upload.any(), async (req, res, next)  => {
    
    if(!req.files) {
        res.status(400).send("Error: No files found")
    } else {
        await req.files.forEach(async file => {

            var val = await uploadBook(file)
            if(val) res.send({ status: false, message: 'No file uploaded'});
            else console.log("book "+file.originalname+" uploaded")
        });
        console.log("all books uploaded!")
        res.status(200).send("books uploaded!")
    }
    
    // var stream = req.files[0].buffer
    // console.log(stream);
    
    // var storage = mega.storage({email: 'ijonnathanesteban@gmail.com', password: 'q estas pelotudo'}, function(err) {
    //      console.log(storage.files)
    //     // storage.mounts
    //   })
        // if(!req.files) {
        //     res.send({
        //         status: false,
        //         message: 'No file uploaded'
        //     });
        // } else {
        //     console.log("entrando" + JSON.stringify(req.query))
        //     //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        //     let avatar = req.files.avatar;
        //     console.log(avatar.name)
        //     //Use the mv() method to place the file in upload directory (i.e. "uploads")
        //     avatar.mv('./uploads/' + avatar.name);

        //     //send response
        //     res.send({
        //         status: true,
        //         message: 'File is uploaded',
        //         data: {
        //             name: avatar.name,
        //             mimetype: avatar.mimetype,
        //             size: avatar.size
        //         }
        //     });
        // }
    
});