let express = require("express");
let bodyParser = require('body-parser');
let PORT = 3000;

let db = require('./data/database');

let server = express();
server.use(express.static(__dirname + '/dist'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

//todo: triggers in sequelize?

//create a new task
    //can have a parentId if it is a subtask

//mark a task as complete
    //this will make all subtasks complete
    //then if all siblings are complete it will recursively complete it's parent task

//mark a task as uncomplete
    //this will recursively mark all of it's parent task as uncomplete
    //does anything else need to happen here? i don't think so

//delete a task
    //this will recursively mark all of it's parent task as uncomplete

server.put('task/:id/:complete', function(req, res) {
    var complete = req.params.complete === 0 ? true : false;
    var id = parseInt(req.params.id, 10);
    //task.title = 'a very different title now'
    //task.save().then(() => {})
    db.tasks.findById(id).then(task => {
        if(!!task){
            task.complete = complete;
            task.save().then(() => {})
            //res.json(task.toJSON());
        }else{
            res.status(404).send();
        }
    }, e => {
        res.status(500).send();
    })


})

server.post('/task', function(req, res) {

    var body = req.body;
    //clean data
    if (body.description && typeof body.description === 'string'
             && body.details && typeof body.details === 'string') {
        body.description = body.description.trim();
        body.details = body.details.trim();
        if(body.taskId){
            body.taskId = parseInt(body.taskId, 10);
        }
	}else{
        res.status(500).send();
    }
    //attempt to persist
    db.tasks.create(body).then(task => {
        res.json(task.toJSON());
    },function(e) {
		res.status(400).json(e);
	})

});

server.get('/task/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    db.tasks.findById(id).then(task => {
        if(!!task){
            res.json(task.toJSON());
        }else{
            res.status(404).send();
        }
    }, e => {
        res.status(500).send();
    })
});


db.sequelizeInstance.sync({force: true}).then(function(){
    console.log('db is ready');

    db.tasks.create({ description: 'clean back yard', details: 'mow the lawn and weed'})
    .then(task1 => {
        db.tasks.create({ description: 'landscape fabric', details: 'need landscape fabric around backyard fence', taskId: task1.id})
        .then(task2 => {
           
        });
    });

    server.listen(PORT, function(){
        console.log('server listening on port: ' + PORT);
    })
});