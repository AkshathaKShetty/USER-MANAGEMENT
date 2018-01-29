var loginctrl = app.controller("loginctrl", function ($scope,$rootScope, getDataService, $state,$filter) {
    $scope.adminDetails = { "username": "admin", "password": "123"};
    $scope.status = true;

    //Import data into controller from Service and storing it in users array
    getDataService.getallusers().then(function (resp) {
        $scope.users = resp.data;
        $scope.usercount = $scope.users.length;
    });

    //User Validation
    $scope.onSubmit = function (username, password) {
        $rootScope.loggedinuser = username;
        $rootScope.loggedinpassw = password;

        if (username.toLowerCase() == "admin")
        {
            if (password.toLowerCase() == "123") {
                $scope.status = "true";
                $state.go("User");
            }
            else
                $scope.status = false; return;
        } else
        {
            for (i = 0; i < $scope.usercount; i++) {
                if (username != undefined && password != undefined) {
                    if ($scope.users[i].name.toLowerCase() == username.toLowerCase() && $scope.users[i].password == password) {
                        $scope.status = true;
                        $scope.adminuser = false;
                        $state.go("User");
                    } else $scope.status = false; return;
                }
                else
                    $scope.status = false; return;
                break;
            } $scope.status = false; return;
        }        
        
    };

    //Filtering based on CheckBoxes
    $scope.heightarray = [{ height: "145cms", on: false }, { height: "150cms", on: false }, { height: "155cms", on: false }, { height: "160cms", on: false }, { height: "165cms", on: false }];
    $scope.agearray = [{ age: 18, on: false }, { age: 25, on: false }, { age: 60, on: false }, { age: 35, on: false }, { age: 50, on: false }];
    $scope.countryarray = [{ country: "India", on: false }, { country: "Australia", on: false }, { country: "China", on: false }, { country: "Srilanka", on: false }, { country: "Canada", on: false }];


   // Add new User
$scope.enabledEdit=[];
    $scope.addNew = function (users) {
        var newuser = {
            name: $scope.addname,
            age: $scope.addage,
            gender: $scope.addgender,
            height: $scope.addheight,
            country: $scope.addcountry         
        }; $scope.users.push(newuser);
        
    };
//Remove
    $scope.remove = function (index) {       
        $scope.users.splice(index,1);
    };
 //Edit   
    var editedUser =[];
    $scope.edit = function (index) {
        $scope.enabledEdit[index] = true;   
        
    };   
  //LogOut  
    $scope.LogOut = function(){
        $state.go('LogOut');
    };
    
});

app.filter('customHeight', function() {
    return function(input, hgts) {
      if(!hgts || hgts.length === 0) return input;
      var out = [];
      angular.forEach(input, function(item) {
        angular.forEach(hgts, function(hgt) {
          if (item.height === hgt.height) {
            out.push(item);
          }
        });
      });
      return out;
    }
  });
  
app.filter('customAge', function () {
    return function (input, ages) {
      if(!ages || ages.length === 0) return input;
      var out = [];
      angular.forEach(input, function(item) {
        angular.forEach(ages, function(age) {
          if (item.age == age.age) {
            out.push(item);
          }
        });
      });
      return out;
    }
  });
  
  app.filter('customCountry', function() {
    return function(input, cntrys) {
      if(!cntrys || cntrys.length === 0) return input;
      var out = [];
      angular.forEach(input, function(item) {
        angular.forEach(cntrys, function(cntry) {
          if (item.country == cntry.country) {
            out.push(item);
          }
        });
      });
      return out;
    }
  });
  
  //Service to get Data from JSON file
app.service('getDataService', function ($http) {
    this.getallusers = function () {
        return $http.get('../UserDetails.json');
    };
});

//Unique filter for labels of filter

app.filter('unique', function() {
    return function(collection, keyname) {
    var output = [], 
    keys = [];
    angular.forEach(collection, function(item) {
    var key = item[keyname];
    if(keys.indexOf(key) === -1) {
    keys.push(key); 
    output.push(item);
          }
      });
      return output;
   };
});
