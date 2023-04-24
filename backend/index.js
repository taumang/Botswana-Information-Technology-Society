const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()

app.use(bodyParser.urlencoded(({extended:false})))
app.use(bodyParser.json());

app.get(`/`,(req,res)=>{
    res.sendFile(__dirname + '../index.html')
})

app.post(`/home_form_index`, (req,res)=>{
    const {
        name,
        email,
        message
    } = req.body

    if(!name|| !email|| !message){
        res.status(400).send('Please provide a name, email, and a message.')
        return
    }

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'kagsihoph@gmail.com',
            pass:'obzjkzrfonxcmfrb',
        },
    })

    const mailOptions = {
         from:'kagishoph@gmail.com',
         to: document.getElementById('email').value,
         subject:'New form submission from BITS website',
         text:`Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
     }

    transporter.sendMail(mailOptions,(error,info)=>{
        if (error){  
        // console.log(error) 
        res.status(500).send('error:could not send email')
        }else{
        //  console.log('Email sent:',info.response)
         res.send(`
         <section id="success">
            <div class="inner">
                <header>
                    <h2>Message Sent</h2>
                    <p>Your message has been sent successfully. We will get back to you soon.</p>
                </header>
            </div>
        </section>
         `);
        }
    })
})

const port = process.env.PORT || 3800
app.listen(port,()=>{
    console.log(`Server is live on ${port}`)
})