var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.create = create;
service.delete = _delete;
service.listQuestions = listQuestions;

module.exports = service;

function create(questionParam) {
    var deferred = Q.defer();

    // validation
    if(_.isEmpty(questionParam)) {
        deferred.reject('A question is needed');
    }
    
    db.questions.insert(
        questionParam,
        onComplete
    );

    function onComplete(err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve();
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function listQuestions() {
    var deferred = Q.defer();
    
    db.questions.find().toArray(function(err, result){
        if (err) throw err;
        console.log('RESULT', result);
        deferred.resolve(result);
    });

    return deferred.promise;
}