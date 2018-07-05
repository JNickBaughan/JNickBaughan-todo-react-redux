let modelHelpers = require('./model-helpers');

module.exports = function( Sequelize, dataTypes ) {
    return Sequelize.define('task', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER, 
            autoIncrement: true 
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200]
            }
        },
        details: {
            type: dataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 1000]
            }
        },
        complete: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },{
        hooks: {
            afterCreate: (task) => {
                //if the newly created task has a parentTask
                if(task.taskId && task.taskId > -1){
                    if(task.complete){//and the new task is complete
                        //are all of it's siblings complete?
                        modelHelpers.areAllSiblingsComplete(Sequelize, task).then(
                            (allSiblingsComplete) => {
                                //if yes we need to recursively complete the parent
                                if(allSiblingsComplete){
                                    modelHelpers.updateParentTask(Sequelize, task.taskId, allSiblingsComplete);
                                }
                            }
                        );
                    }else{//if the new task is not complete
                        //if yes we need to recursively unComplete the parent
                        modelHelpers.updateParentTask(Sequelize, task.taskId, false);
                    }
                }
            },
            afterUpdate: (task, option) => {
                //if it has a parentTask
                if(task.taskId && task.taskId > -1){
                    if(task.complete){//if the task is complete
                        //are all of it's siblings complete?
                        modelHelpers.areAllSiblingsComplete(Sequelize, task).then(
                            (allSiblingsComplete) => {
                                console.log('allSiblings')
                                console.log(allSiblingsComplete)
                                //if yes we need to recursively complete the parent
                                if(allSiblingsComplete){
                                    modelHelpers.updateParentTask(Sequelize, task.taskId, allSiblingsComplete);
                                }
                            }
                        );
                    }else{//if the task is not complete
                        //if yes we need to recursively unComplete the parent
                        modelHelpers.updateParentTask(Sequelize, task.taskId, false);
                    }
                }        
            },
            afterDelete: (deletedTask) => {
                //does it have any children?
                modelHelpers.haveAnySiblings(Sequelize, deletedTask).then(siblingLength => {
                    if(siblingLength > 0){//yes? recursively delete them
                        //todo: need to delete all subTasks
                    }
                });
                if(deletedTask.taskId){//does it have a parent task???
                    //are all of it's siblings complete?
                    modelHelpers.areAllSiblingsComplete(Sequelize, task).then(
                        (allSiblingsComplete) => {
                            //if yes we need to recursively complete the parent
                            if(allSiblingsComplete){
                                modelHelpers.updateParentTask(Sequelize, task.taskId, allSiblingsComplete);
                            }
                        }
                    );
                }
            }
        }
    })
}
