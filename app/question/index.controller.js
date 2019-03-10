(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.question = null;

        initController();

        function initController() {
            /*
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            */
        }
    }

})();