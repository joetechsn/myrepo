(function(){

    var vguardModApp = angular.module('vguard-module', []);
	var restBaseUrl="http://hydracoder.com/"
   /*vguardModApp.service('vguardService', function ($http, $q, $timeout) {
    this.viewPolicy = function () {
		return true;
    };
}); */

   vguardModApp.service('vguardService', function ($http, $q, $timeout) {
    
	/*this.viewPolicy = function () {
      var policy = $http.get(restBaseUrl+"api/Quote/GetInfoWoParam").
		success(function(data, status, headers, config) {
          return data;
	    }).
	    error(function(data, status, headers, config) {
            console.log("Error");
            return {"status": false};
      	}); 
       return policy;
    };*/
	
	 /*this.viewPolicy = function () {
	 var data = {PolicyDetails : {name: 'Mike',age: 27,adress: 'Wolf trap Rd,USA'}};
      var policy = $http.post(restBaseUrl+"api/Quote/GetInfoWoParam", JSON.stringify(data)).
		success(function(data, status, headers, config) {
          return data;
	    }).
	    error(function(data, status, headers, config) {
            console.log("Error");
            return {"status": false};
      	}); 
       return policy;
    }; */
	
		 this.viewPolicy = function (policyId) {
		 console.log("..2..");
	 var data = {PolicyDetails : {name: 'Mike',age: 27,adress: 'Wolf trap Rd,USA'}};
      var policy = $http.get("https://reqres.in/api/users?page=2").
		success(function(data, status, headers, config) {
		console.log("..Data..");
          return data;
	    }).
	    error(function(data, status, headers, config) {
            console.log("Error");
            return {"status": false};
      	}); 
       return policy;
    };
});

/*vguardModApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);*/
	
    vguardModApp.controller('vguardCtl',function ($scope,vguardService) {
    $scope.policy = {};
	$scope.policyMaxAmountList = [300, 150, 200];
	$scope.selectedPolicies = [];
	$scope.coverageLimit="";
	$scope.flag_showComparisonWindow = false;
	var MAX_POLICIES_TO_COMPARE = 2;
	$scope.dataLoaded = false; 
	  $scope.$watch('flag_showComparisonWindow', function(value) {
		if (value) {
			$('[id="selectoption"]').removeClass("hide").addClass("show");
		}
		});
	
	   this.viewVguardCtrl=function(policyId) {
					vguardService.viewPolicy(policyId).then(
                    function(policy) { 
                        // Need to get the data alone, as mongoose appends the entire URL also, which is not required to us.
                        $scope.policy = policy["data"]; 
						$scope.dataLoaded = true;
                    });
         };
		 
		 
		 $scope.canDisableSelection = function(policyId){
			return (getPolicyIndex(policyId) == -1 &&  $scope.selectedPolicies.length == MAX_POLICIES_TO_COMPARE);
		 };
		 
		 function preparePolicyJason(policyId,policyName,amount) {
			//var policyString = '{"PolicyId":' + policyId +', "PolicyName":' +policyName+', "PremiumDetail": {"PremiumTotalAmount": '+amount +'}}';
			var policyJason = {"PolicyId":policyId, "PolicyName":policyName, "PremiumDetail": {"PremiumTotalAmount": amount}};
			return policyJason;
		 };
		 
		 function getPolicyIndex(policyId) {
			for (i = 0; i < $scope.selectedPolicies.length; i++) {
				var policyObj = $scope.selectedPolicies[i];
				if (policyObj.PolicyId == policyId) {
					return i;
				}
			}
			return -1;
		 };
		 
		 function getSelectedPolicy(policyId) {
			for (i = 0; i < $scope.selectedPolicies.length; i++) {
				var policyObj = $scope.selectedPolicies[i];
				if (policyObj.PolicyId == policyId) {
					return policyObj;
				}
			}
			return null;
		 };
		 	   this.setSelectedPolicy=function(policyId,policyName,amount) {
					var policyJason = preparePolicyJason(policyId,policyName,amount);
					var index = getPolicyIndex(policyId);
					if (index > -1) {
						if ($scope.selectedPolicies.length == MAX_POLICIES_TO_COMPARE) {
							$scope.flag_showComparisonWindow = false;
						}
						$scope.selectedPolicies.splice(index, 1);
					} else {
						if ($scope.selectedPolicies.length < MAX_POLICIES_TO_COMPARE) {
							$scope.selectedPolicies.push(policyJason);
							$scope.flag_showComparisonWindow = false;
							if ($scope.selectedPolicies.length == MAX_POLICIES_TO_COMPARE) {
								$scope.flag_showComparisonWindow = true;
							} 
						} else if ($scope.selectedPolicies.length >= MAX_POLICIES_TO_COMPARE) {
							$scope.flag_showComparisonWindow = true;
						} 
					}
			};
		 	
			this.removeAllPoliciesForComparison = function() {
					for (i = 0; i < $scope.selectedPolicies.length; i = 0) {
						var policyObj = $scope.selectedPolicies[i];
						this.removePolicyForComparison(policyObj.PolicyId);
					}
			};
			
		 	   this.removePolicyForComparison = function(policyId) {
					var index = getPolicyIndex(policyId);
					if (index > -1) {
						$scope.selectedPolicies.splice(index, 1);
						$scope.flag_showComparisonWindow = false;
						var checkBoxSelect = document.getElementById("selectPolicyCheckBox"+policyId)
						if (checkBoxSelect != null) {
							checkBoxSelect.checked = false;
						}
					} 
			};
			
			this.changeCoverageLimit = function changeCoverageLimit(policyId) {
				console.log("..1..");
				getPolicyMax(policyId);
				console.log("..2..");
				var selectedPolicy = getSelectedPolicy(policyId);
				console.log(selectedPolicy);
				selectedPolicy.PremiumDetail.PremiumTotalAmount = 300;
				console.log(selectedPolicy.PremiumDetail.PremiumTotalAmount);
				console.log($scope.selectedPolicies);
			};
    });
    
    

})();

function getAngularScope(){
var scope = angular.element($('[ng-controller="vguardCtl as vguardCtl"]')).scope();
return scope;
}


function tempCall() {
    var scope = getAngularScope();
    scope.$apply(function () {
    scope.vguardCtl.viewVguardCtrl('2');
    });
}


        function getPlanMax() {
           // debugger;
            var objPolicyId = PlanViewPolicyId;
            angular.element(document).injector().invoke(function ($compile, $rootScope) {
                $rootScope.$apply(function () {
                    var $scope1 = angular.element($('[ng-controller="vguardCtl as vguardCtl"]')).scope();
                    $scope1.viewVguardCtrl(objPolicyId, 'Yes');
                    //$compile($targetDom)($scope1);
                });
            });
        }