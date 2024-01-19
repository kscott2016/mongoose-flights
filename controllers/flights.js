import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"


function index(req,res){
  Flight.find({})
  .then(flights=>{
    res.render('flights/index',{
      title:"All Flights",
      flights:flights
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/')
  })
}

function newFlight (req,res){
    res.render('flights/new',{
      title:"Add Flight",
      flightDefaultDate:new Date().toISOString().slice(0,16)
    })
}

function create(req,res){

  //sets default date if flight is null
  if (!req.body.departs) {
    req.body.departs= Flight.departs
  }

  Flight.create(req.body).then(flight=>{
    
    res.redirect('/flights')
  })
}


function deleteFlight(req,res){

  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight=>{
    res.redirect('/flights')
  })
  .catch (err=>{
    console.log(err)
    res.redirect('/flights')
  })
}

function show(req,res){
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {

    Meal.find({_id: {$nin:flight.meals}})
    .then(meals=>{
      
      res.render('flights/show',{
        title: `Flight: ${req.params.flightId}`, 
        flight:flight,
        meals:meals
      })
    })
  })
  .catch (err=>{
    console.log(err)
    res.redirect('/')
  })
}

function edit(req,res){

  if (!req.body.departs) {
    req.body.departs= Flight.departs
  }
  
  Flight.findById(req.params.flightId).then(flight=>{

    console.log("flight.departs: "+ flight.departs)

    if(flight.departs===null){
      
      let currentDate = new Date()
      let currentYear= currentDate.getFullYear()
      currentDate.setFullYear(currentYear+1)
      flight.departs= currentDate
      console.log("UPDATED flight.departs: "+ flight.departs)
    }

    const flightDefaultDate = flight.departs.toISOString().slice(0,16)
    //console.log("Default Date: "+ flightDefaultDate)

    res.render(`flights/edit`,{
      flight:flight,
      flightDefaultDate:flightDefaultDate,
      title: `Edit Flight: ${req.params.flightId}`
    })
  })
}

function update(req,res){

Flight.findByIdAndUpdate(req.params.flightId,req.body).then(flight=>{

    res.redirect(`/flights/${flight._id}`)
    })
    .catch(err=>{
      console.log(err)
      res.redirect('flights')
    })
}

function createTicket(req,res){

  Flight.findById(req.params.flightId)
  .then(flight =>{
    flight.tickets.push(req.body)
    flight.save()
    .then(()=>{
      res.redirect(`/flights/${req.params.flightId}`)
    })
    .catch(err=>{
    console.log(err)
    res.redirect('/flights')
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/flights')
  })
}

function addMeals(req, res) {

  Flight.findById(req.params.flightId)
  .then(flight => {
    console.log("Flight", flight)
    flight.meals.push(req.body.mealId)
    flight.save()
		.then(() => {
		  res.redirect(`/flights/${flight._id}`)
		})
    .catch(err => {
      console.log(err)
      res.redirect("/flights")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}


export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  addMeals
}