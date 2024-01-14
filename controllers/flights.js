import { Flight } from "../models/flight.js"

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
      title:"Add a new flight",
    })
}

function create(req,res){

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
  Flight.findById(req.params.flightId).then(flight=>{
    res.render(`flights/edit`,{
      flight:flight,
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


export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update
}