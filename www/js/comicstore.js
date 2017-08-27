(function(){

 	angular.module('starter.comicstore', ['ionic'])


	.service('comicstore', function($http,$q) {
		
		var hash = '74ef215029a27e1e6e924356427c8c6d';
        var params = '?ts=1&apikey=d65e303cf9155ebe8b2221bc457c883f&hash=74ef215029a27e1e6e924356427c8c6d';
		var url = 'https://gateway.marvel.com/v1/public/comics';
    

		return {

			getAll: function() {
            return $http.get(url+params+'&orderBy=title')
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error');
                        return $q.reject(errResponse);
                    }
            );

        },

         getNext: function(offset){

            return $http.get(url+params+'&orderBy=title',{params:offset})
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error');
                        return $q.reject(errResponse);
                    }
            );
        },

         getComic: function(id){

            return $http.get(url+'/'+id+params)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error');
                        return $q.reject(errResponse);
                    }
            );
        },

		}
		
	});

}());

