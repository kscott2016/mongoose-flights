import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema= new Schema({
  airline: {
    type: String,
    required:true
  },
  airport:{
    type: String,
    required:true
  }, 
  flightNo:{
    type: Number,
    required:true
  },
  departs:{
    type: Date,
    required:true
  },
})

// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}