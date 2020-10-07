
const express = require('express')
const app = express()
const InMemoryWorkshop = require("./service/inMemoryWorkshop")
const ejs = require('ejs')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'template');
app.use(express.static('rsc/css'));

function displayWorkshopsList(res) {
    InMemoryWorkshop.getWorkshopList()
    .then(workshops => {
        res.render("index", {
            workshops: workshops
        })
    })
} 

app.get('/', function (req, res) {
    displayWorkshopsList(res);
})

app.get('/workshop', function (req, res) {
    console.log("get")
    res.render('workshop')
})

app.post('/workshop', function (req, res) {
    const name = req.body.name
    const description = req.body.description
    InMemoryWorkshop.addWorkshop(name, description).then(() => {
        res.redirect("/")
    })
    .catch(e =>res.send(e.message))
})

app.get('/workshop/:name', function (req, res) {
    const workshopName = req.params.name
    InMemoryWorkshop.getWorkshopByName(workshopName)
    .then(workshop => {
        res.render('workshop-update',  {
            workshop: workshop
        })
    })
    .catch(e =>ejs.send(e.message))
})

app.post('/remove-workshop', function (req, res) {
    const name = req.body.name;
    InMemoryWorkshop.removeWorkshopByName(name).then(() => {
        res.redirect("/")
    })
    .catch(e =>res.send(e.message))
})

app.post('/update-workshop', function(req, res) {
    const name_old = req.body.name_old;
    const name = req.body.name;
    const description = req.body.description;
    InMemoryWorkshop.updateWorkshop(name_old, name, description).then(() => {
        res.redirect("/")
    })
    .catch(e =>res.send(e.message))
})

app.listen(3000, function () {
  console.log('Workshop app listening on port 3000!')
})
