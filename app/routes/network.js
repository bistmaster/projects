'use strict';

var Network = function () {

	var mongoose = require('mongoose');
	var NetworkModel = require('./../models/network').Network;
	var networkModel = new NetworkModel(mongoose);
	var self = this;

	// handle the incoming request of creating a document
	self.create = function (req, res){
		networkModel.create(req.body, function(err, doc){
			if(err instanceof Error){
				res.send({result: false});
			} else {
				res.send({result: true, id: doc._id});
			}
		});
	};

	self.read = function (req, res){
		var id = req.params.networkId;
		networkModel.read(id, function(err, doc){
			if(err instanceof Error){
				res.send(200, {result: false});
			} else {
				res.send(200, {result: true, doc: doc});
			}
		});
	};

	self.reads = function (req, res){
		networkModel.reads(function(err, docs){
			if(err instanceof Error){
				res.send(200, [{result: false, docs:[]}]);
			} else {
				res.send(200, [{result: true, docs: docs}]);
			}
		});
	};

	self.update = function (req, res){
		var id = req.params.networkId;
		networkModel.update(id, req.body, function(err, doc){
			if(err instanceof Error){
				res.send(200, {result: false});
			} else {
				res.send(200, {result: true, id: doc._id});
			}
		});
	};	

	self.delete = function (req, res){
		var id = req.params.networkId;
		console.log(id);
		networkModel.delete(id, function(err, doc){
			if(err instanceof Error){
				res.send(200, {result: false});
			} else {
				res.send(200, {result: true, delete: true});
			}
		});
	};

	self.updateHost = function (req, res){
		var hostnameId = req.params.hostnameId;
		networkModel.updateHost(hostnameId, req.body, function(err, result){
			if(err instanceof Error){
				res.send(200, {result: false});
			} else {
				res.send(200, {result: true, update: true});
			}
		});
	};

	self.updateNetwork = function (req, res){
		var networkId = req.params.networkId;
		networkModel.updateNetwork(networkId, req.body, function(err, result){
			if(err instanceof Error){
				res.send(200, {result: false});
			} else {
				res.send(200, {result: true, update: true});
			}
		});		
	};

	self.deleteNetwork = function (req, res){
		var networkId = req.params.networkId;
		var id = req.params.id;
		networkModel.deleteNetwork(id, networkId, function(err, result){
			if(err instanceof Error){
				res.send(200, {result: false});	
			} else {
				res.send(200, {result: true, delete: true});
			}
		});
	};

	self.deleteHostname = function (req, res) {
		var hostnameId = req.params.hostnameId;
		var id = req.params.id;
		networkModel.deleteHostname(id, hostnameId, function(err, result){
			if(err instanceof Error){
				res.send(200, {result: false});	
			} else {
				res.send(200, {result: true, delete: true});
			}
		});		
	};
};

exports.Network = new Network();