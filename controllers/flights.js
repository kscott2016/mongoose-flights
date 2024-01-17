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

  // const flightDefaultDate = flight.departs.toISOString().slice(0,16)
  //   console.log("Default Date: "+ flightDefaultDate)
  
    res.render('flights/new',{
      title:"Add a new flight",
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
  .then(flight => {
    res.render('flights/show',{
      title: `Flight: ${req.params.flightId}`, 
      flight:flight
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


export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket
}