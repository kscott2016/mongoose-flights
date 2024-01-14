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

  // for(let key in req.body){
 
  //  if(req.body[key]==='')delete req.body[key]
  // }
  Flight.create(req.body).then(flight=>{
   res.redirect('/flights')
  })
}


export{
  index,
  newFlight as new,
  create
}