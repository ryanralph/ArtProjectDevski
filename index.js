var express = require('express'),
	app = express(),
	port = process.env.PORT || 5000,
	bodyParser = require('body-parser')

//app.use(bodyParser()j
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sensorStates = [0, 0]
var locationId = 0
var MAX_SENSOR_RANGE = 1,
	 MIN_SENSOR_RANGE = 0


app.route('/').get(function(req, res) {
	console.log('Hit /')
	res.json({"hello": "world"})
})

app.route('/echo').post(function(req, res) {
	console.log('POST /echo')
	res.send(req.body.data)
	console.log(JSON.stringify(req.body.data))
})

app.route('/location/all').get(function(req, res) {
	console.log('GOT /location/all')
	returnVal = {"status": "OK",
					"locationId": "all",
					"sensorState": sensorStates}
	res.json(returnVal)
	console.log(returnVal)
	returnVal = {}
})

app.route('/location/:id').get(function(req, res) {
	locationId = req.params.id
	console.log('GOT /location/' + locationId)
	returnVal = {"status": "OK",
					"locationId": locationId,
					"sensorState": sensorStates[locationId]}
	res.json(returnVal)
	console.log(returnVal)
	returnVal = {}
})

app.route('/location/').post(function(req, res) {
	console.log('POST /location/')
	var data = JSON.parse(req.body.data)
	locationId = data.locationId
	if(locationId > ((sensorStates.length)-1)) {
		returnVal = {"status": "ILLEGALLOCATION"}
	} else {
		if(locationId == 0) {
			returnVal = sensorStates[1]
		} else {
			returnVal = sensorStates[0]
		}
	}
	res.json(returnVal)
	console.log(returnVal)
})

app.route('/location/:id').post(function(req, res) {
	console.log('POST /location/' + req.params.id)
	var data = JSON.parse(req.body.data)
	locationId = data.locationId
	if(locationId > ((sensorStates.length)-1)) {
		returnVal = {"status": "ILLEGALLOCATION"}
	} else {
		sensorState = data.sensorState
		if((sensorState > MAX_SENSOR_RANGE) || (sensorState < MIN_SENSOR_RANGE)) {
			returnVal = {"status": "SENSOROUTOFRANGE"}
		} else {
			if(locationId == 0) {
				returnVal = sensorStates[1]
			} else {
				returnVal = sensorStates[0]
			}
			sensorStates[locationId] = sensorState
			/*returnVal = {"status": "OK",
							"locationId": locationId,
							"sensorStates": sensorStates}*/
		}
	}
	res.json(returnVal)
	console.log(returnVal)
})


app.listen(port)
console.log('API server started on: ' + port);

