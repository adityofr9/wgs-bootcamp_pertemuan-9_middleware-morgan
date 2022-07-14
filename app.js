const express = require('express')
//Express EJS Layouts
var expressLayouts = require('express-ejs-layouts');
//3rd party Middleware Morgan
var morgan = require('morgan')
const app = express()
const port = 3000

//Information using EJS
app.set('view engine', 'ejs')
//Jika lokasi file layout berada di folder lain maka gunakan
// app.set('layout', 'nama_folder/layout');
app.use(expressLayouts)

//Morgan dev
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.use(express.static('public'))

//Routes List
app.get('/', (req, res) => {
    cont = [
        {
            name: 'Adityo',
            email: '1st@gmail.com',
        },
        {
            name: 'Fathur',
            email: '2nd@gmail.com',
        },
        {
            name: 'Rahim',
            email: '3rd@gmail.com',
        },
    ]
    res.render('index', 
    {
        nama: "Muhammad Adityo Fathur Rahim",
        title: 'Webserver EJS',
        cont,
    });
})

app.get('/about', (req, res, next) => {
    res.render('about', {nama: "Muhammad Adityo Fathur Rahim",
    //layout: '', perintah ini sama seperti perintah app.set('layout', 'nama_folder/layout');
    title: 'Webserver EJS'})
    // next()
})

app.get('/contact', (req, res) => {
    res.render('contact', {nama: "Muhammad Adityo Fathur Rahim",
    title: 'Webserver EJS'})
})

//Url dengan mengambil parameter id dan query category
app.get('/product/:id', (req, res) => {
    //category ini sebagai variable yang akan diberikan di url
    res.send(`product id : ${req.params.id} <br>
            category id : ${req.query.category} <br>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>`)
})

//Jika url dimasukkan selain routes list yang tersedia
app.use('/', (req,res) => {
    res.status(404)
    res.send('Page not found: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})