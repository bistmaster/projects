'use strict';

/**
 * The application file bootstraps the angular app by  initializing the main module and
 * creating namespaces and moduled for controllers, filters, services, and directives.
 */

var Application = Application || {};

Application.Values = angular.module('application.values', []);
Application.Services = angular.module('application.services', []);
Application.Controllers = angular.module('application.controllers', []);

var appDeps = [
    'ngRoute',
    'application.services',
    'application.controllers',
    'restangular',
];

var config = function($routeProvider, $locationProvider, $compileProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3001/api/v1/');
    RestangularProvider.setResponseInterceptor(function(data){
        return data;
    });
    RestangularProvider.setRequestInterceptor(function(element){
        return element;
    });
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|bitcoin):/);
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
        .when('/', {templateUrl: 'tpl/list.tpl.html', controller: 'ListNetworkCtrl'})
        .when('/create', {templateUrl: 'tpl/create.tpl.html', controller: 'CreateNetworkCtrl'})
        .when('/delete/:id', {templateUrl: 'tpl/admin-home.html', controller: 'DeleteNetworkCtrl'})
        .when('/read/:id', {templateUrl: '../tpl/read.tpl.html', controller: 'ReadNetworkCtrl'})
        .when('/update/id', {templateUrl: 'tpl/login.html', controller: 'UpdateNetworkCtrl'})
        .otherwise({redirectTo: '/'});
};

angular.module('application', appDeps)  
    .config([
        '$routeProvider',
        '$locationProvider',
        '$compileProvider',
        'RestangularProvider',
        config
    ]);
