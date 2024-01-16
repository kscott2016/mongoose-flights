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
    required:true,
    min: 10,
    max: 9999
  },
  departs:{
    type: Date,
    default: function() {
      let currentDate = new Date()
      let currentYear= currentDate.getFullYear()
  	  currentDate.setFullYear(currentYear+1)
      //console.log("NEW FLIGHT DATE MADE: "+ currentDate)
      return currentDate
    }
  },
},{
  timestamps: true
})

// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}