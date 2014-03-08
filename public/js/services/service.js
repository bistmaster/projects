'use strict';

var NetworkFactory = function (Restangular, $location) {
    var NetworkFactory = {},
    baseNetwork = Restangular.all('network');
    // create a network 
    NetworkFactory.create = function (data, callback){
        baseNetwork.customPOST(data).then(function(response){
            return callback(response);
        });
    };

    // get all the networks with all status
    NetworkFactory.reads = function (callback){
        baseNetwork.getList().then(function(response){
            return callback(response[0].docs);
        });
    };

    // get network details by id
    NetworkFactory.read = function (id, callback) {
        baseNetwork.get(id).then(function(response){
            return callback(response.doc);
        });
    };

    // update network, set by status
    NetworkFactory.update = function (id, network, callback){
        baseNetwork.one(id).customPUT(network).then(function(response){
            return callback(response.result);
        });
    };

    NetworkFactory.updateOneNetwork = function (id, networkEdit, callback){
        baseNetwork.one(id).customPUT(networkEdit, 'network').then(function(response){
            return callback(response);
        });
    }; 

    NetworkFactory.updateOneHostname = function (id, hostnameEdit, callback){
        baseNetwork.one(id).customPUT(hostnameEdit, 'hostname').then(function(response){
            return callback(response);
        });
    };  

    NetworkFactory.deleteNetwork = function (id,  callback){
        baseNetwork.one(id).customGET('delete').then(function(response){
            return callback(response);
        });
    };

    NetworkFactory.deleteNetworkOne = function (id, networkId, callback){
        baseNetwork.one(id).customGET(networkId + '/networks/delete').then(function(response){
            return callback(response);
        });
    };

    NetworkFactory.deleteHostnameOne = function (id, hostnameId, callback){
        baseNetwork.one(id).customGET(hostnameId + '/hostnames/delete').then(function(response){
            return callback(response);
        });
    };    
    return NetworkFactory;
};

Application.Services.factory("NetworkFactory", ['Restangular', '$location', NetworkFactory]);