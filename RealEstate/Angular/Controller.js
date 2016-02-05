﻿app.controller("estatesTblController", function ($scope, angularService) {
    GetAllEstates();
    $scope.selectedUser = [];
    $scope.selectedCity = [];
    $scope.sortReverse = false;
    $scope.sortType = 'ID'
    //$scope.filtered = 0;//$scope.estates.length;
    $scope.listCity = [{
        id: 1,
        name: 'Apple'
    }, {
        id: 2,
        name: 'Facebook'
    }, {
        id: 3,
        name: 'Google'
    }];
    $scope.listUser = [{
        id: 1,
        name: 'Apple'
    }, {
        id: 2,
        name: 'Facebook'
    }, {
        id: 3,
        name: 'Google'
    }];
    $scope.setSelected = function (id, sList) {
        
        if (_.contains($scope[sList], id)) {
            $scope[sList] = _.without($scope[sList], id);
        } else {
            $scope[sList].push(id);
        }
        return false;
    }
    $scope.isChecked = function (id, sList) {
        if (_.contains($scope[sList], id)) {
            return 'glyphicon glyphicon-ok';
        }
        else {
            return'';
        }
    }
    $scope.checkAll = function (sList,sSelected) {
        $scope[sSelected] = _.pluck($scope[sList], 'id');
    };
    function GetAllEstates() {
        var getData = angularService.GetAllEstates();
        getData.then(function (est) {
            $scope.estates = est.data;
            //$scope.filtered = $scope.estates.length;
        }, function () {
            //alert('Error in getting records');
        });
    }
    $scope.editEstate = function (estate) {
        var getData = angularService.editEstate(estate);
        $location.path("Estates/EditEstate");
        getData.then(function (estate) {
            $scope.estate = estate.data
        },
        function () {
            alert('Error in getting records');
        });
    }
    function GetEstatesByUser(id) {
        var getData = angularService.GetEstatesByUser(id);
        getData.then(function (est) {
            $scope.estates = est.data;
        }, function () { }
        );
    }
    $scope.userFilter = function (estates, selectedUser) {
        if (!angular.isUndefined(estates) && !angular.isUndefined(selectedUser) && selectedUser.length > 0) {
            var tempEstates = [];
            angular.forEach(selectedUser, function (id) {
                angular.forEach(estates, function (estate) {
                    if (angular.equals(estate.user.id, id)) {
                        tempClients.push(estate);
                    }
                });
            });
            return tempEstates;
        } else {
            return estates;
        }
    }
});
app.controller("estateEditController", function ($scope, angularService) {
    $scope.myInterval = 500;
    $scope.uploadFiles = [];
    $scope.attachment;
    $scope.slides = [];
    
    $scope.getSlides = function (estateId) {
        var getData = angularService.getSlides(estateId);
        getData.then(function (images) {
            $scope.slides = images.data;
        });
    }
    alert("33");
    $scope.deleteImage = function (estateId) {
        var currentIndex = $('div.active').index();
        if (currentIndex >= 0)
        {
            
            var image = $scope.slides[currentIndex]
            //$scope.slides.splice(currentIndex, 1);
            var getData = angularService.deleteImage(image, estateId)
            $scope.getImageList(estateId);
        }
        
        return "";
    }
    $scope.getImageList = function (estateId) {
        
        var getData = angularService.getImageList(estateId);
        getData.then(function (images) {
            $scope.slides = images.data;
        });
    }
    $scope.listImages = function (estateId) {
        return "";
    }
    
    $scope.file_changed = function (element, estateId) {

        $scope.$apply(function (scope) {
            var data = new FormData();

            for (var i in element.files) {
                data.append("uploadedFile", element.files[i]);
            }
            data.append("estateId", JSON.stringify(estateId))
            

            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            //objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            // SEND FILE DETAILS TO THE API.
            
            objXhr.open("POST", "/Estates/FileUpload/");
            //objXhr.setRequestHeader("id", estateId);
            //objXhr.setRequestHeader("Content-Type", element.type);
            objXhr.send(data);
/*
            var photofile = element.files[0];
            
            var reader = new FileReader();
            reader.onload = function (e) {
                
                // handle onload
            };
            reader.readAsDataURL(photofile);
            alert(reader)
            */
        });
        //$scope.slides.pop(element.files[0])
        $scope.getImageList(estateId);
        alert("22");
    };
    

    // CONFIRMATION.
    function transferComplete(e) {
  //      alert("Files uploaded successfully.");
    }
     
});
//