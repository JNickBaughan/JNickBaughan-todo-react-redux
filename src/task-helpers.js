const tasks = {
    "1" : { id: 1, complete: false },
    "2" : { id: 2, complete: false, taskId: 1 },
    "3" : { id: 3, complete: false, taskId: 1 },
    "4" : { id: 4, complete: false, taskId: 3 },
    "5" : { id: 5, complete: false, taskId: 3 },
    "6" : { id: 6, complete: false, taskId: 4 },
    "7" : { id: 7, complete: false, taskId: 4 },
    "8" : { id: 8, complete: false },
    "9" : { id: 9, complete: false },
    "10" : { id: 10, complete: true, taskId: 9 },
    "11" : { id: 11, complete: false, taskId: 9 },
    "12" : { id: 12, complete: false, taskId: 11 },
    "13" : { id: 13, complete: true, taskId: 11 },
}

//takes the id and completes the task
//then recursively completes all subTasks
const check = (id) => {
    tasks[id].complete = true;
    for (var key in tasks) {
        const task = tasks[key];
        const taskId = task.taskId;
        const complete = task.complete;
        if(taskId === id && !complete){
            check(task.id);
        }
    }
}

const tasksForUncheck = {
    "1" : { id: 1, complete: true },
    "2" : { id: 2, complete: true, taskId: 1 },
    "3" : { id: 3, complete: true, taskId: 1 },
    "4" : { id: 4, complete: true, taskId: 3 },
    "5" : { id: 5, complete: true, taskId: 3 },
    "6" : { id: 6, complete: true, taskId: 4 },
    "7" : { id: 7, complete: true, taskId: 4 }
}
//1 true
    //2 true
    //3 true
        //4 true
            //6 true
            //7 true
        //5 true

const uncheck = (id, taskList) => {
    taskList[id].complete = false;
    if(taskList[id].taskId && taskList[id].taskId > -1){
        uncheck(taskList[id].taskId, taskList);
    }
}

uncheck('5', tasksForUncheck);
console.dir(tasksForUncheck);

//this checks if all sibling tasks are complete, if they are it completes the parent
//then recursively checks the parent's sibling tasks
const checkSiblings = (id) => {
    tasks[id].complete = true;
    const parentId = tasks[id].taskId;
    if(parentId && parentId > -1){
        //find all siblings
        let siblingsAreAllComplete = true;
        for (var key in tasks) {
            if(siblingsAreAllComplete && tasks[key].taskId === parentId){
                const task = tasks[key];
                siblingsAreAllComplete = task.complete;
            }
        }
        //if all siblings are complete call checkSiblings on the parent
        if(siblingsAreAllComplete){
            checkSiblings(parentId);
        }
    }  
}

//checkSiblings('12');
//check('4');
//console.dir(tasks);

