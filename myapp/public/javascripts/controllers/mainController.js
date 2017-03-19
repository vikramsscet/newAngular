/**
 * Created by raov on 12/03/17.
 */

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    var imdbBaseUrl = "http://www.omdbapi.com";
    var defaultMovieSearch = "";
    if($scope.movieName){
        defaultMovieSearch = $scope.movieName;
    }else{
        defaultMovieSearch = "?s=Batman&y=2016";
    }
    $http.get(imdbBaseUrl+defaultMovieSearch).then(function (response) {
        console.log(response);
        $scope.movies = response.data.Search;
        $scope.pageArray = Utils.getArrayTill(Utils.getPageCount(10, response.data.totalResults));
        setPagination();
    });
    $scope.movieSearch = function() {
        defaultMovieSearch = "?s="+$scope.movieName;
        var imdbUrl = imdbBaseUrl+defaultMovieSearch
        $http.get(imdbUrl).then(function (res) {
            console.log(res);
            $scope.movies = res.data.Search;
            $scope.pageArray = Utils.getArrayTill(Utils.getPageCount(10, res.data.totalResults));
            setPagination();
        });
    };
    $scope.setPage = function(event){
        $scope.pageNum = event.currentTarget.attributes.pagenum.value;
        var paginationElements = event.currentTarget.parentElement.getElementsByClassName("w3-dark-grey");
        [].forEach.call(paginationElements, function(el) {
            el.classList.remove("w3-dark-grey");
        });

        event.currentTarget.className += " w3-dark-grey";
        var imdbUrl = imdbBaseUrl+defaultMovieSearch+"&page="+$scope.pageNum;
        $http.get(imdbUrl).then(function (res) {
            $scope.movies = res.data.Search;
            setPagination($scope.pageNum);
        });
    };
    var setPagination = function(pageNum = 1){
        $scope.pageNum = pageNum;
        var pagination = Utils.getPreviousNextPage($scope.pageArray.length, $scope.pageNum);
        $scope.previousPage = pagination.pre;
        $scope.nextPage = pagination.next;
    }
});
/**
 E for Element name
 A for Attribute
 C for Class
 M for Comment
 */
app.directive("current", function() {
    return {
        restrict : "C",
        link: function ($scope, el, attrs) {
            if(attrs.pagenum == $scope.pageNum ){
                el.addClass("w3-dark-grey")
            }

        }
    };
});