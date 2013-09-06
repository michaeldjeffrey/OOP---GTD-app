//============================== TASK METHODS =========================
function complex_task_subtasks(){
    subtasks = []
    $("[name='subtask_title']").each(function(i){
        if($(this).val().trim() !== '') subtasks.push({text: $(this).val()})
    })
    return subtasks
}

function complex_task_defaults(){
    $.each(COMPLEX_TASK_INPUTS, function(key, value){
        $("#complex_task_"+value).val('')
    })
    $(".task-title").val('');
    $("#task_modal").modal('hide');
    STAR_IMPORTANCE_STATE = 0;
}

function resort_tasks_on_drag_stop(){
    var tasks = $("#task_wrapper").children();
    $.each(tasks, function(index, element){
        TASKS[$(element).data('id')].id = index;
    })
    localStorage.clear()
    $.each(TASKS, function(index, task){
        task.save()
    })
}

function resort_on_task_remove(){
    for (var task = 0; task < TASKS.length; task++) {
        $("#task_wrapper").find('[data-id="'+TASKS[task].id+'"]').data('id', task)
        TASKS[task].id = task;
    }
    localStorage.clear()
    $.each(TASKS, function(index, task){
        task.save()
    })
}

function unfade_all_tasks(){
    $(".fade").removeClass('fade')
}
function fade_all_tasks(){
    $(".accordion-group").addClass('fade');
}
//======================== LOCAL STORAGE METHODS =========================
function localstorage_retrieve(){
    var saved_tasks = []
    for(var key in localStorage){
        var task = new Task(JSON.parse(localStorage.getItem(key)))
        saved_tasks.push(task)
    }
    return saved_tasks
}