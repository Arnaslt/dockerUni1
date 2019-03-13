#1 atsiskaitymas


## commands to start the rest-api: 
docker build -t perikuplt .
docker run -d -p 1414:3000 perikuplt


##api running on localhost:1414

// get , put , delete , post, patch
to //cars:id

// fields
// name : string
// bought: bool
// price: int

localhost:1414/api/cars
localhost:1414/api/cars/1


