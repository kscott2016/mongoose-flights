import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

//GET /flights/:flightId/meals/new
router.get("/new", mealsCtrl.new)

//GET /flights/:flightId/meals
router.post("/", mealsCtrl.create)

export{
  router
}