const express = require("express")
const app = express()
const port = process.env.PORT||3000
const mongoose = require('mongoose')
const Document = require("./models/document")
const path=require('path')

mongoose.connect("mongodb://localhost/wastebin",{
   
})


app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('',(req,res)=>{

    const code = `Welcome to WasteBin!
    
Use this command in top left conner
to create a new file to share with other`
    
    res.render('code-display',{
        code
    })
})

app.get("/new",(req,res)=>{
    res.render('new')
})

app.post('/save',async (req,res)=>{
    const value=req.body.value
    try {
        const document = await Document.create({
            value
        })
     //   res.redirect(`/${document.id}`)
    }catch(e){
        res.render("error:",e)
    }
})


app.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id
    try {
      const document = await Document.findById(id)
      res.render("new", { value: document.value })
    } catch (e) {
      res.redirect(`/${id}`)
    }
  })
  
  app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const document = await Document.findById(id)
  
      res.render("code-display", { code: document.value, id })
    } catch (e) {
      res.redirect("/")
    }
  })

  
app.listen(port,()=>{
    
    console.log("Server Running on http://localhost:3000")
})