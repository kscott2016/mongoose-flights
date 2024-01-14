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


export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete
}