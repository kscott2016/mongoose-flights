import { Meal } from "../models/meal.js"

function newMeal(req,res){

  Meal.find({}).sort('name')
  .then(meals=>{
        res.render('meals/new',{
      meals:meals,
      title: 'Add Meal'
    })
  })
  .catch(err=>{

    console.log(err)
    res.redirect('/flights')
  })
}

function create (req, res){

  console.log("MEAL Added:", req.body.name)

  Meal.find({name:req.body.name})
  .then(foundMeal=>{
    console.log("FOUND MEAL: ", foundMeal.length)
    if(!foundMeal.length){
      Meal.create(req.body)
      .then(meal=>{
        res.redirect('/flights')
        })
        .catch(err=>{
          console.log(err)
          res.redirect('/flights')
        })
    }
    else{
      res.redirect('/meals/new')
    }
  })
  .catch(err=>{
    console.log("ERROR HIT: ")
    console.log(err)
    res.redirect('/meals/new')
  })
  
  // if(!(!!Meal.find({name:`${req.body.name}`}))){
  //   //console.log("This exists!!!")
  //   Meal.create(req.body)
  //   .then(meal=>{
  //     res.redirect('/flights')
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //     res.redirect('/flights')
  //   })
  // }

  // else{
  //   res.redirect('/flights')
  // }


//-----FAILSAFE CODE
  // Meal.create(req.body)
  // .then(meal=>{
  //   res.redirect('/flights')
  // })
  // .catch(err=>{
  //   console.log(err)
  //   res.redirect('/flights')
  // })
}
export{
  newMeal as new,
  create
}