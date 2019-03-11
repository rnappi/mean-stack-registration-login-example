(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.IndexController', Controller);

    function Controller(UserService, QuestionService, FlashService) {
        var vm = this;

        vm.question = {
            username: null,
            text: null
        };
        vm.questions = null;
        vm.saveQuestion = saveQuestion;

        initController();

        function initController() {
            UserService.GetCurrent().then(function (user) {
                vm.question.username = user.username;
                getQuestions();
            });
        }

        function getQuestions(){
            QuestionService.Get().then(function(questions){
                vm.questions = questions;
            });
        }

        function saveQuestion(){
            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Question saved');
                    getQuestions();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
})();