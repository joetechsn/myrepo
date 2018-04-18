    function setMessage(successMessage, failureMessage, srcObj, prop, successVal) {
        var v = srcObj[prop];
        if (v == successVal) {
            $scope.successMsg = successMessage;
        } else {
            $scope.errorMsg = failureMessage; 
        }
    }
	
	