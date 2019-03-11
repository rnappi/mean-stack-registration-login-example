var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.get('/', listQuestions);
router.post('/', registerQuestion);
router.delete('/:_id', deleteQuestion);

module.exports = router;

function deleteQuestion(req, res) {
    var questionId = req.params._id;

    questionService.delete(questionId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listQuestions(req, res) {
    questionService.listQuestions()
    .then(function(questions){
        if(questions.length > 0){
            res.send(questions);
        } else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function registerQuestion(req, res) {
    questionService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}