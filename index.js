var express = require('express')
var axios = require('axios')
var app = express()
var bodyParser = require('body-parser')
var path = require("path")

var base_url = "http://localhost:3000"
app.set("views", path.join(__dirname, "/public/views"))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => res.render("index"))

app.get('/Sign_in', async(req, res) => {
    const respones = await axios.get(base_url + '/Customers')
    res.render("Sign_in", { Customer: respones.data })

})

app.get('/Sign_up', async(req, res) => {
    const respones = await axios.get(base_url + '/Customers')
    res.render("Sign_up", { Customer: respones.data })

})


app.post('/Register_Customer', async(req, res) => {
    try {

        const data = {
            Name: req.body.Name,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Address: req.body.Address,
            Password: req.body.Password
        }

        console.log(data.Name)

        await axios.post(base_url + '/Customer_Post', data)
        res.redirect("/")



    } catch (err) {
        console.error(err)
        res.status(500).send('Error3')
    }
})




app.listen(5500, () => console.log(`Listening on port 5500`))