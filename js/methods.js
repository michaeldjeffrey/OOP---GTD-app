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
    for (var task in tasks) {
        TASKS[$(tasks[task]).data('id')].id = task;
    }
    localStorage.clear()
    for(var task in TASKS){
        TASKS[task].save()
    }
}

function resort_on_task_remove(){
    for (var task = 0; task < TASKS.length; task++) {
        $("#task_wrapper").find('[data-id="'+TASKS[task].id+'"]').data('id', task)
        TASKS[task].id = task;
    };
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
//======================== TASK RENDERING =========================
var TASK_ELEMENT =  "<div class='accordion-group {completed_state}' data-id='{collapse_id}'> \
                        <div class='accordion-heading'> \
                            <a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion2' href='#collapse_{collapse_id}'> \
                                {title} \
                                <i id='check_{collapse_id}' data-status='{completed_state}' class='{completed_state_class} checkStyle pull-left'></i> \
                                <i id='item_star_{collapse_id}' data-importance='{importance}' class='{priority} starStyle pull-left'></i> \
                                <div class='sepLine pull-left'></div> \
                                <span class='pull-right'>{due_date}</span> \
                            </a> \
                        </div> \
                        {collapse} \
                    </div>";
var COLLAPSE_ELEMENT = "<div id='collapse_{collapse_id}' class='accordion-body collapse in'> \
                            <div class='accordion-inner'> \
                                {description} \
                                {tags} \
                                {subtasks} \
                             </div> \
                        </div>";