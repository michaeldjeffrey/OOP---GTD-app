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
    $(".task_title").val('');
    $("#task_modal").modal('hide');
    STAR_IMPORTANCE_STATE = 0;
}

function resort_tasks_on_drag_stop(){
    var tasks = $("#task_wrapper").children();
    for (var task = 0; task < tasks.length; task++) {
        TASKS[$(tasks[task]).data('id')]._id = task;
    };
}

function resort_on_task_remove(){
    for (var task = 0; task < TASKS.length; task++) {
        $("#task_wrapper").find('[data-id="'+TASKS[task]._id+'"]').data('id', task)
        TASKS[task]._id = task;
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
    for (var i = 0; i < localStorage.length; i++) {
        var task = new Task(JSON.parse(localStorage.getItem(i)))
        saved_tasks.push(task)
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
function localstorage_resort_delete_save(){
    localStorage.clear()
    for(task in TASKS){
        localstorage_save(TASKS[task])
    }
}

//======================== TASK RENDERING =========================
function build_subtasks(subtasks){
    // TODO: make this display nicer output
    var temp_string = '';
    $.each(subtasks, function(key, value){
        temp_string += value.text+", "
    })
    return temp_string;
}
function build_tags(tags){
    var temp_string = '';
    for (var i = 0; i < tags.length; i++) {
        // TODO: replace &emsp; with a class
        temp_string += '<span class="label label-info">'+ tags[i] +'</span>&emsp;'
    };
    return temp_string
}

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