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

    return NetworkFactory;
};

Application.Services.factory("NetworkFactory", ['Restangular', '$location', NetworkFactory]);