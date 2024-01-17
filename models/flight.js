import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat:{ 
  type: String,
  match: /[A-F][1-9]\d?/
},
price:{ 
  type: Number,
  min:0}
})

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
  tickets:[ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref:'Meal'}]
},{
  timestamps: true
})

// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}