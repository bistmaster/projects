Application.Controllers.controller('CreateNetworkCtrl', ['$scope', '$routeParams', '$location', 'NetworkFactory', function ($scope, $routeParams, $location, NetworkFactory) {
	
}]);

Application.Controllers.controller('EditNetworkCtrl', ['$scope', '$routeParams', '$location', 'NetworkFactory', function ($scope, $routeParams, $location, NetworkFactory) {
	
}]);

Application.Controllers.controller('DeleteNetworkCtrl', ['$scope', '$routeParams', '$location', 'NetworkFactory',  function ($scope, $routeParams, $location, NetworkFactory) {
	
}]);

Application.Controllers.controller('UpdateNetworkCtrl', ['$scope', '$routeParams', '$location', 'NetworkFactory',  function ($scope, $routeParams, $location, NetworkFactory) {
	
}]);

Application.Controllers.controller('ListNetworkCtrl', ['$scope', '$routeParams', '$location', 'NetworkFactory',  function ($scope, $routeParams, $location, NetworkFactory) {
	NetworkFactory.reads(function(docs){
		$scope.networks = docs;
	});
}]);

Application.Controllers.controller('ReadNetworkCtrl', ['$scope', '$routeParams', '$location', 'NetworkFactory',  function ($scope, $routeParams, $location, NetworkFactory) {
	$scope.id = $routeParams.id;
	NetworkFactory.read($scope.id, function(docs){
		$scope.network = docs;
	});	

	$scope.editNetworkOne = function (id, $index){
		$scope.networkEdit = $scope.network.networks[$index];
		$scope.network.networks[$index].edit = true;
	};

	$scope.editHostnameOne = function (id, $index){
		$scope.hostnameEdit = $scope.network.hostnames[$index];
		$scope.network.hostnames[$index].edit = true;
	};	

	$scope.cancelEditHostnameMode = function (id, $index){
		$scope.network.hostnames[$index].edit = false;
	};

	$scope.cancelEditNetworkMode = function (id, $index){
		$scope.network.networks[$index].edit = false;
	};

	$scope.saveNetworkOne = function (id, $index){
		console.log($scope.networkEdit);
	};

	$scope.saveHostOne = function (id, $index){
		console.log($scope.hostnameEdit);
	};

	$scope.addNetwork = function () {
		var networks = $scope.networkNew;
		$scope.network.networks.push(networks);
		//clearNetworkFields();
	};

	$scope.addHostname = function () {
		var hostnames = $scope.hostnameNew;
		$scope.network.hostnames.push(hostnames);
		clearHostnameFields();
	};

	var clearNetworkFields = function (){
		$scope.networkNew.nid = "";
		$scope.networkNew.n_name = "";
		$scope.networkNew.n_ip = "";
	};

	var clearHostnameFields = function (){
		$scope.hostnameNew.hostname = "";
	}

}]);