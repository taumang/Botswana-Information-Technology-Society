// const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()

app.use(bodyParser.urlencoded(({extended:false})))
app.use(bodyParser.json());

app.post(`./index.js`, (req,res)=>{
    const {
        name,
        email,
        message
    } = req.body

    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'kagsiho@gmail.com',
            pass:'09Taumang',
        },
    })

    const mailOptions = {
        from:'kagishoph@gmail.com',
        to:'09taumang@gmail.com',
        subject:'New form submission from BITS website',
        text:`Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if (error){  
        console.log(error) 
        res.status(500).send('error:could not send email')
        }else{
         console.log('Email sent:',info.response)
         res.send('Form submitted successfully');
        }
    })
})

const port = process.env.PORT || 3800
app.listen(port,()=>{
    console.log(`Server is live on ${port}`)
})