(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var service = {};

        service.Get = Get;
        service.Create = Create;
        service.Delete = Delete;

        return service;

        function Get() {
            return $http.get('/api/questions').then(handleSuccess, handleError);
        }

        function Create(question) {
            return $http.post('/api/questions', question).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/questions/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();
