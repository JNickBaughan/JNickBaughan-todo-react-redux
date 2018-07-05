
const hasTaskCompletenessChanged = (status, task) => {
    return status !== task.complete;

}

const updateParentTask = (Sequelize, parentId, complete) => {
    //find the parentTask
    return Sequelize.database.tasks.findById(parentId).then(task => {
        if(!!task){
            //then set the complete status if need be
            if(hasTaskCompletenessChanged(complete, task)){
                task.complete = complete;
                task.save().then(() => {})
            }
        }else{
            //todo: throw an error if we didn't find the parent
        }
    }, e => {
        //todo: throw an error if we didn't find the parent
    })
}

const areAllSiblingsComplete = (Sequelize, task) => {
   //are all of it's siblings complete?
   return Sequelize.database.tasks.findAll({
        where: {
            taskId: task.taskId
        }
    }).then(siblings => {
        return siblings.reduce((allSiblingsComplete, sibling) => {
            if(allSiblingsComplete){
                allSiblingsComplete = sibling.dataValues.complete;
            }
            return allSiblingsComplete;
        }, true);
    })
}

const haveAnySiblings = (Sequelize, task) => {
    return Sequelize.database.tasks.findAll({
        where: {
        taskId: task.taskId
        }
    }).then(siblings => {
        return siblings.length
    })

}

module.exports = {
    updateParentTask,
    areAllSiblingsComplete,
    haveAnySiblings
};
