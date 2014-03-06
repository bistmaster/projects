var should = require('should');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/networks';
mongoose.connect(dbUrl, function(err){
	if(err) {
		console.log('Cannot connect to database')
		throw err;
	}
});

describe('Network Model', function(){
	var NetworkModel = require('./../../app/models/network').Network;
	var networkModel = new NetworkModel(mongoose);
	var id = null;

	describe('Create a network', function(){
		it('should create a network data', function(done){
			var network = {};
			network.uid = 1234;
			network.networks = [{
					nid: 1,
					n_name: 'workstationOne',
					n_ip: '192.168.0.1',
					n_status: 1
			}];
			network.hostnames = [{
				hostname: 'ip.unotelly.com',
				block: 1
			}];
			networkModel.create(network, function(err, doc){
				should.not.exist(err);
				should.exist(doc);
				id = doc._id;
				done();
			});
		});
	});

	describe('Read a network', function(){
		it('should read a network data', function(done){
			networkModel.read(id, function(err, doc){
				should.not.exist(err);
				should.exist(doc);
				doc.uid.should.equal(1234);
				doc.should.have.property('networks');
				doc.should.have.property('hostnames');
				done();
			});
		});
	});

	describe('Update a network', function(){
		it('should update a network data', function(done){
			var network = {};
			network.uid = 4321;
			network.networks = { nid: 2, n_name: "test", n_ip:"123.123.0.1", n_status: 0 };
			network.hostnames = {hostname: "testing", block: 1 };
			networkModel.update(id, network, function(err, doc){
				should.not.exist(err);
				should.exist(doc);
				doc.uid.should.equal(4321);
				doc.should.have.property('networks');
				doc.should.have.property('hostnames');
				done();
			});
		});
	});

	/*describe('Delete a network', function(){
		it('should delete a network data', function(done){
			networkModel.delete(id, function(result){
				result.should.be.true;
				done();
			});
		});
	});*/


});