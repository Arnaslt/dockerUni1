const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json())

const cars = [
  { id: 1, name: 'bmw e90', bought: true, price: 100 },
  { id: 2, name: 'mazda miyata', bought: false, price: 95 },
  { id: 3, name: 'mitsubishi lancer', bought: true, price: 70 }
];


app.get('/', (req, res) => {
  res.send('use this :) localhost:1414/api/cars/ ')
})

app.get('/api/cars', (req, res) => {
  res.send(cars)
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id))
  if(!car) return res.status(404).send('The car with given id was not found')
  res.send(car);
})

app.post('/api/cars', (req, res) => {
  const { error } = validateCar(req.body)

  if(error) return res.status(400).send(error.details[0].message)
  const car = {
    id: cars.length + 1,
    name: req.body.name,
    bought: req.body.bought,
    price: req.body.price
  }
  cars.push(car)
res.status(201).send(car)
})

app.put('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id))
if(!car) return res.status(404).send('The car with given id was not found')

const { error } = validateCarPut(req.body)

if(error) return res.status(400).send(error.details[0].message)

car.name = req.body.name
car.bought = req.body.bought
car.price = req.body.price
res.send(car)
})

app.patch('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id))
  if(!car) return res.status(404).send('The car with given id was not found')

const { error } = validateCar(req.body)

  if(error) return res.status(400).send(error.details[0].message);

  if(req.body.name) {
    car.name = req.body.name
  }

  if(req.body.bought) {
    car.bought = req.body.bought
  }
  if(req.body.price) {
    car.price = req.body.price
  }
  res.send(car)
})

app.delete('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id))
if(!car) return res.status(404).send('The car with given id was not found')

const index = cars.indexOf(car)
cars.splice(index, 1)
res.send(car)
})

const port = 3000

app.listen(port, () => console.log(`Listening ... on port 1414`))

function validateCar(car) {
  const schema = {
    name: Joi.string().min(3),
    bought: Joi.boolean(),
    price: Joi.number()
  }
  return Joi.validate(car, schema)
}

function validateCarPut(car) {
  const schema = {
    name: Joi.string().min(3).required(),
    bought: Joi.boolean().required(),
    price: Joi.number().required()
  }
  return Joi.validate(car, schema)
}