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
	app.put('/api/v1/network/network/:networkId', networkRoutes.updateNetwork);
	app.put('/api/v1/network/hostname/:networkId', networkRoutes.updateHost);
	app.delete('/api/v1/network/network/:id/:networkId', networkRoutes.deleteNetwork);
	app.delete('/api/v1/network/hostname/:id/:networkId', networkRoutes.deleteNetwork);
	app.delete('/api/v1/network/:networkId', networkRoutes.delete);
};
