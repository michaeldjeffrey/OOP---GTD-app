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
    STAR_IMPORTANCE_STATE = 0;
}
//======================== LOCAL STORAGE METHODS =========================
function localstorage_retrieve(){
    var saved_tasks = []
    for (var i = 0; i < localStorage.length; i++) {
        saved_tasks.push(new Task(JSON.parse(localStorage.getItem(i))))
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

//======================== TASK RENDERING =========================
function build_subtasks(subtasks){
    var temp_string = '';
    $.each(subtasks, function(key, value){
        temp_string += value.text+", "
    })
    return temp_string;
}
function build_tags(tags){
    var temp_string = '';
    console.log('building tags', tags)
    for (var i = 0; i < tags.length; i++) {
        // TODO: replace &emsp; with a class
        temp_string += '<span class="label label-info">'+ tags[i] +'</span>&emsp;'
        
    };
    return temp_string
}

var TASK_ELEMENT =  "<div class='accordion-group'> \
                        <div class='accordion-heading'> \
                            <a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion2' href='#collapse{collapse_id}'> \
                                {title} \
                                <i id='check{collapse_id}' data-status='{completed_state}' class='{completed_state_class} checkStyle pull-left'></i> \
                                <i id='itemStar{collapse_id}' class='{priority} starStyle pull-left'></i> \
                                <div class='sepLine pull-left'></div> \
                                <span class='pull-right'>{due_date}</span> \
                            </a> \
                        </div> \
                        {collapse} \
                    </div>";
var COLLAPSE_ELEMENT = "<div id='collapse{collapse_id}' class='accordion-body collapse in'> \
                            <div class='accordion-inner'> \
                                {description} \
                                {tags} \
                                {subtasks} \
                             </div> \
                        </div>";