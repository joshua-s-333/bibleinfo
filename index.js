const express = require( "express")
const mongoose = require( "mongoose")
const cors = require( 'cors')
const bible = require( './models/bible')
const path = require("path")
const app = express()
app.use(cors());
app.use(express.json())

const PORT = 5000
const DB = "mongodb+srv://bible:bibleapp@cluster0.3om6qgr.mongodb.net/bibleApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => app.listen(PORT)).catch(err => console.log(err))

app.get('/api/:book', async (req, res) => { 
    const name = req.params.book.toLowerCase().trim()
    let data = []
    try {
        if (name == "bible")
            data = await bible.find().sort("book_no")
        if (name == "old testement")
            data = await bible.find({book_no: { $lte: 39 }}).sort("book_no")
        if (name == "new testement")
            data = await bible.find({book_no: { $gte: 40 }}).sort("book_no")
        if(data.length == 0)
            data = await bible.find({book_name : { $regex: "^"+name+"$", '$options' : 'i' } }).sort("book_no")
        if (data.length == 0)
            data = await bible.find({aurthor : { $regex: "^"+name+"$", '$options' : 'i' } }).sort("book_no")
        if(data.length == 0)
            data = await bible.find({themes : { $regex: "^"+name+"$", '$options' : 'i' } }).sort("book_no")
        if (data.length == 0)
           data = await bible.find({ministry : { $regex: "^"+name+"$", '$options' : 'i' } }).sort("book_no")
    } catch (error) {
       console.log("ERROR"); 
    }
    if(!data)
        res.status(200).json({data})
    res.status(200).json({data})
})

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', async (req, res) => { 
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});