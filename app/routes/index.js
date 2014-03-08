'use strict';

module.exports = function(app) {
	//initialize routes
	var networkRoutes = require('./network').Network;

	app.get('/', function(req, res){
		console.log('got it');
		res.render('index');
	});
	// Network Routes
	app.post('/api/v1/network', networkRoutes.create);
	app.get('/api/v1/network', networkRoutes.reads);
	app.get('/api/v1/network/:networkId', networkRoutes.read);
	// app.put('/api/v1/network/network/:networkId', networkRoutes.updateNetwork);
	app.put('/api/v1/network/:networkId/network', networkRoutes.updateNetwork);
	app.put('/api/v1/network/:hostnameId/hostname', networkRoutes.updateHost);
	app.get('/api/v1/network/:id/:networkId/networks/delete', networkRoutes.deleteNetwork);
	app.get('/api/v1/network/:id/:hostnameId/hostnames/delete', networkRoutes.deleteHostname);
	app.get('/api/v1/network/:networkId/delete', networkRoutes.delete);
};
