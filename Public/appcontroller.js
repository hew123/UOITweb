var app  = angular.module("app", []);

app.controller("bioctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/bio").then(function (response) {
    console.log(response.data);
    $scope.bio = response.data.about;
    $scope.interest = response.data.interest;
    $scope.area = response.data.area;
    $scope.img = response.data.file_name;
  });
});

app.controller("contactctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/contact").then(function (response) {
    console.log(response.data);
    $scope.address = response.data.address;
    $scope.phone_number = response.data.phone_number;
    $scope.email = response.data.email;
    $scope.img = response.data.file_name;
  });
    $scope.faculty = "Faculty of Business and IT";
    $scope.university = "University of Ontario Institute of Technology";
});

app.controller("groupctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/group").then(function (response) {
    console.log(response.data);
    //$scope.pastCurrent = response.data.pastCurrent;
    //$scope.name = response.data.name;
    //$scope.degree = response.data.degree;
    $scope.studentarray = response.data;
  });
});

app.controller("newsctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/news").then(function (response) {
    //console.log(response.data);
    $scope.newsarray = response.data;
    /*$scope.newstitle = response.data.title;
    $scope.newsurl = response.data.url;
    $scope.newsdescription = response.data.description;*/
  });
});

app.controller("pressctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/press").then(function (response) {
    console.log(response.data);
    /*$scope.presstitle = response.data.pressrelease;
    $scope.year = response.data.year;
    $scope.description = response.data.description;
    $scope.url = response.data.url;*/
    $scope.pressarray = response.data;
  });
});

app.controller("pubctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/pub").then(function (response) {
    console.log(response.data);
  /*  $scope.journaltype = response.data.journaltype;
    $scope.year = response.data.year;
    $scope.description = response.data.description;
    $scope.url = response.data.url;
    */
      $scope.pubarray = response.data;
  });
});

app.controller("researchctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/research").then(function (response) {
    console.log(response.data);
    //$scope.programTitle = response.data.programTitle;
    //$scope.programDescription = response.data.programDescription;
    $scope.programarray = response.data;
  });
});

app.controller("teachingctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/teaching").then(function (response) {
    console.log(response.data);
  /*  $scope.school = response.data.school;
    $scope.semester = response.data.semester;
    $scope.courseTitle = response.data.courseTitle;
    $scope.courseNumber = response.data.courseNumber;
    $scope.year = response.data.year; */
    $scope.coursearray = response.data;
  });
});
