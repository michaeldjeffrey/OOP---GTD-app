var TASKS = localstorage_retrieve();
var AUTOCOMPLETE_TAGS = [];
var TASK_STATUS = {
    'completed': 'icon-check-sign',
    'incomplete': 'icon-check-empty',
}
var TAGS_ARRAY = []
var STAR_IMPORTANCE_STATE = 0
var STAR_IMPORTANCE = {
    0: {star: 'icon-star-empty', text: 'Low Importance'},
    1: {star: 'icon-star-half-empty', text: 'Important'},
    2: {star: 'icon-star', text: 'Very Important'}
}
var COMPLEX_TASK_INPUTS = [
    'title',
    'description',
    'tags',
    'datepicker',
    'clockpick',
]
$(function(){
//====================== MAKE TASKS FROM LOCALSTORAGE ========================
    for(task in TASKS){
        var task = TASKS[task];
        render_task(task)
        if(typeof(task.tags) !== 'undefined'){
            $.each(task.tags, function(key2, tag){
                AUTOCOMPLETE_TAGS.push(tag)
            })
        }
        
    }
//================================= INIT PLUGINS ========================
    // init bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // initialize select2
    $("#complex_task_tags").select2({
        tags: TAGS_ARRAY,
        tokenSeparators: [',', ' ']
    }).on('select-selecting', function(e){
        TAGS_ARRAY.push(e.val);
    });
    // init datepicker and clockpick
    $("#complex_task_datepicker").datepicker();
    $("#complex_task_clockpick").clockpick();
    // keep both title fields the same
    $(".task-title").on('keyup', function(){
        $(".task-title").val($(this).val());
    })
    $(".accordion").sortable()

//=========================== BUTTON CLICK METHODS =============================
    // Set importance data in modal window
    $("#importance-btn").on('click', function(){
        var star = $(this).find('i');
        var text = $(this).find('span');
        var state = $(this).data('state');
        STAR_IMPORTANCE_STATE = STAR_IMPORTANCE_STATE == 2 ? 0 : ++STAR_IMPORTANCE_STATE;
        star.removeClass().addClass(STAR_IMPORTANCE[STAR_IMPORTANCE_STATE]['star']);
        text.text(STAR_IMPORTANCE[STAR_IMPORTANCE_STATE]['text']);
    });
    // add subtask field
    $("#complex_task_add_subtask").on('click', function(){
        $(this).parent().append("<br><input class='clearfix input-large' type='text' name='subtask_title' placeholder='subtask title'> ")
    });
    // When a tasks checkmark is clicked
    $('#task_wrapper').on('click', "[id^='check_']", function(e){
        e.stopPropagation();
        // TODO: save the task as completed or not completed
        $(this)
            .toggleClass('icon-check-sign')
            .toggleClass('icon-check-empty')
            .closest('.accordion-group')
            .toggleClass('completed');
    });
    $("#task_wrapper").on('click', "[id^='item_star_']", function(e){
        e.stopPropagation();
        // TODO: save the task importance
        var star = $(this).data('importance');
        $(this).removeClass(STAR_IMPORTANCE[star]['star'])
        star = star == 2 ? $(this).data('importance', 0).data('importance') : $(this).data('importance', ++star).data('importance');
        $(this).addClass(STAR_IMPORTANCE[star]['star'])
    })

//============================== ADDING TASKS =====================================
    // add simple task
    $('#add_simple_task').on('click', function(e){
        e.preventDefault();
        var text = $("#simple_task_text");
        var task = new Task({text: text.val(), priority: 0, sort_order: TASKS.length});
        TASKS.push(task);
        localstorage_save(task);
        render_task(task);
        text.val('');
    });

    // add complex task
    $("#add_complex_task").on('click', function(e){
        var variables = {};
        $.each(COMPLEX_TASK_INPUTS, function(key, value){
            variables[value] = $("#complex_task_"+value).val()
        })
        variables['due_date'] = variables['datepicker'] + ' ' + variables['clockpick'];
        variables['tags'] = variables['tags'].split(',')
        // TODO: convert to object method
        variables['due_date'] = moment(variables['due_date']).fromNow();
        variables['priority'] = STAR_IMPORTANCE_STATE;
        variables['subtasks'] = complex_task_subtasks()
        variables['sort_order'] = TASKS.length

        var task = new Task(variables)
        render_task(task)
        TASKS.push(task)
        localstorage_save(task)

        complex_task_defaults()
        console.log(variables)
    });
})
//============================== RENDER TASKS =====================================
function render_task(task){
    var collapse_id, due_date, title, description, completed_state, priority, tags;
    var _title, _body;

    collapse_id = task._id;
    due_date = task.due_date;
    title = task.text;
    // if description is null, set to false
    description = (task.description != null) ? task.description: false;
    completed_state = task.status;
    priority = task._priority;
    // if tags is not greater than zero, set to false
    tags = (task.tags.length > 0) ? task.tags : false;
    subtasks = (task.subtasks.length > 0) ? task.subtasks : false;

    _title = TASK_ELEMENT.replace(/{collapse_id}/g, collapse_id)
    _title = _title.replace("{due_date}", due_date)
    _title = _title.replace("{title}", title)
    _title = _title.replace("{completed_state}", completed_state)
    _title = _title.replace("{completed_state_class}", TASK_STATUS[completed_state])
    _title = _title.replace("{importance}", priority)
    _title = _title.replace("{priority}", STAR_IMPORTANCE[priority]['star'])

    if(description || tags || subtasks){
        _body = COLLAPSE_ELEMENT.replace('{collapse_id}', collapse_id)

        // turn into empty string if it doesn't exist
        description = description ? description : '';
        tags = tags ? build_tags(tags) : '';
        subtasks = subtasks ? build_subtasks(subtasks) : '';

        // replace in template string
        _body = _body.replace('{description}', description)
        _body = _body.replace('{tags}', tags)
        _body = _body.replace('{subtasks}', subtasks)
        _title = _title.replace('{collapse}', _body)
    } else {
        _title = _title.replace('{collapse}', ' ')
    }
    // if()
    $('#task_wrapper').append(_title);
}