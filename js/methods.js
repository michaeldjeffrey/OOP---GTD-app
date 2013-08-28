//============================== TASK METHODS =========================
function complex_task_subtasks(){
    subtasks = []
    $("[name='subtask_title']").each(function(i){
        console.log("going through subjtast")
        if($(this).val().trim() !== '') subtasks.push({text: $(this).val()})
    })
    return subtasks
}

function complex_task_defaults(){

}
//======================== LOCAL STORAGE METHODS =========================
function localstorage_retrieve(){
    var saved_tasks = []
    for (var i = 0; i < localStorage.length; i++) {
        saved_tasks.push(new Task(JSON.parse(localStorage(i))))
    }
    return saved_tasks
}
function localstorage_save(task){
    localStorage.setItem(task._id, JSON.stringify(task))
}
function localstorage_delete(task){
    if(task !== null || task !== undefined){
        var temp = localstorage_retrieve();
        localStorage.clear();
        temp.splice(task._id, 1);
        // TODO: look at redoing this so I know what's going on
        temp.forEach(function(key, value){
            key._id = value;
            localstorage_save(key)
        })
    }
}