var express = require('express'),
	app = express(),
	port = process.env.PORT || 5000,
	bodyParser = require('body-parser')

//app.use(bodyParser()j
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sensorStates = [0, 0]
var locationId = 0
var MAX_SENSOR_RANGE = 10,
	 MIN_SENSOR_RANGE = 0


app.route('/').get(function(req, res) {
	console.log('Hit /')
	res.json({"hello": "world"})
})

app.route('/echo').get(function(req, res) {
	console.log('GOT /echo')
	res.json(req)
	console.log(req)
})

app.route('/location/:id').get(function(req, res) {
	locationId = req.params.id
	console.log('GOT /location/' + locationId)
	returnVal = {"status": "OK",
					"locationId": locationId,
					"SensorState": sensorStates[locationId]}
	res.json(returnVal)
	console.log(returnVal)
	returnVal = {}
})

app.route('/location/:id').post(function(req, res) {
	console.log('POST /location/' + req.params.id)
	if(!req.body.locationId) {
		returnVal = {"status": "WRONGPARAMS"}
	} else {
		if(!req.body.sensorState) {
			returnVal = {"status": "NOSTATE"}
		} else {
			locationId = req.body.locationId
			if(locationId > ((sensorStates.length)-1)) {
				returnVal = {"status": "ILLEGALLOCATION"}
			} else {
				sensorState = req.body.sensorState
				if((sensorState > MAX_SENSOR_RANGE) || (sensorState < MIN_SENSOR_RANGE)) {
					returnVal = {"status": "SENSOROUTOFRANGE"}
				} else {
					sensorStates[locationId] = req.body.sensorState
					returnVal = {"status": "OK",
									"locationId": locationId,
									"SensorState": sensorStates[locationId]}
				}
			}
		}
	}
	res.json(returnVal)
	console.log(returnVal)
})


app.listen(port)
console.log('API server started on: ' + port);

