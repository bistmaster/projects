'use strict';

var Network = function (mongoose) {
    var NetworkSchema = new mongoose.Schema({
        uid: Number,
        networks: [{
            nid: Number,
            n_name: String,
            n_ip: String,
            n_status: Boolean,
            edit: {type: Boolean, default: 0}
        }],
        hostnames: [{
            hostname: String,
            block: Boolean,
            edit: {type: Boolean, default: 0}
        }]
    });
    var Network = mongoose.model('Network', NetworkSchema);
    var self = this;
    
    self.create = function (data, cb){
        var network = new Network();
        network.uid = data.uid;
        network.networks = data.networks;
        network.hostnames = data.hostnames;
        network.save(function(err, doc){
            if(err instanceof Error){
                return cb(err, null);
            } else {
                return cb(null, doc);
            }
        });  

    };

    self.update = function (id, network, cb){
        Network.findOneAndUpdate({_id: id},
                {$set: {uid: network.uid }, $push: {hostnames: network.hostnames, networks: network.networks}},
                function(err, doc){
                    if(err instanceof Error){
                        return cb(err, null);
                    } else {
                        return cb(null, doc);
                    }
        });
    };

    // get specific ticket document
    self.read = function (id, cb){
        Network.findOne({_id: id}, function(err, doc){
            if(err instanceof Error){
                return cb(err, null);
            } else {
                return cb(null, doc);
            }           
        });
    };

    // get specific ticket document
    self.reads = function (cb){
        Network.find().sort('-date_created').exec(function(err, doc){
            if(err instanceof Error){
                return cb(err, null);
            } else {
                return cb(null, doc);
            }           
        });
    };

    self.delete = function(id, cb){
        Network.findByIdAndRemove(id, function(err){
            if(err instanceof Error){
                return cb(err);
            } else {
                return cb(true);
            }           
        });
    };

    self.updateNetwork = function (networkId, network, cb){
        Network.update({"networks:_id": networkId}, 
            { $set :
                {
                    "networks.$.nid": network.nid,
                    "networks.$.n_name": network.n_name,
                    "networks.$.n_ip": network.n_ip,
                    "networks.$.n_status": network.n_status
                }
            },
            {},
            function(err, affected, raw){
                if(err) {
                    return cb(err, null);
                } else {
                    return cb(null, affected);
                }
            });
    };

    self.updateHost= function (hostId, host, cb){
          Network.update({"hostnames:_id": hostId}, 
            { $set :
                {
                    "hostnames.$.hostname": host.hostname,
                    "hostnames.$.block": host.block

                }
            },
            {},
            function(err, affected, raw){
                if(err) {
                    return cb(err, null);
                } else {
                    return cb(null, affected);
                }
            });      
    };

    self.deleteNetwork = function (id, networkId, cb){
        Network.update({_id: id}, {$pull : { "networks" : {_id: networkId}}}, function(err, numberAffected, raw) {
            if(err){
                return callback(err, false);
            } else {
                return callback(null, numberAffected);
            }
        });        
    };

    self.deleteHost = function (id, hostId, cb){
        Network.update({_id: id}, {$pull : { "hostnames" : {_id: hostId}}}, function(err, numberAffected, raw) {
            if(err){
                return callback(err, false);
            } else {
                return callback(null, numberAffected);
            }
        });
    }  
};

exports.Network = Network;
