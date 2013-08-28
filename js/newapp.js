var TASKS = localstorage_retrieve()
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

//=========================== BUTTON CLICK METHODS =============================
    // Set importance data in modal window
    $("#importance-btn").on('click', function(){
        var star = $(this).find('i');
        var text = $(this).find('span');
        var state = $(this).data('state');
        STAR_IMPORTANCE_STATE = STAR_IMPORTANCE_STATE == 2 ? 0 : ++STAR_IMPORTANCE_STATE;
        star.removeClass().addClass(STAR_IMPORTANCE[STAR_IMPORTANCE_STATE]['star']);
        text.text(STAR_IMPORTANCE[STAR_IMPORTANCE_STATE]['text']);
    })
    // add subtask field
    $("#complex_task_add_subtask").on('click', function(){
        $(this).parent().append("<br><input class='clearfix input-large' type='text' name='subtask_title' placeholder='subtask title'> ")
    })

//============================== ADDING TASKS =====================================
    // add simple task
    $('#add_simple_task').on('click', function(e){
        e.preventDefault();
        var text = $("#simple_task_text");
        var task = new Task({text: text.val(), priority: 0, sort_order: TASKS.length});
        // TASKS.push(renderTask(task));
        // localstorage_save(task);
        text.val('');
    });

    // add complex task
    $("#add_complex_task").on('click', function(e){
        var variables = {};
        $.each(COMPLEX_TASK_INPUTS, function(key, value){
            variables[value] = $("#complex_task_"+value).val()
        })
        variables['due_date'] = variables['datepicker'] + ' ' + variables['clockpick'];
        // TODO: convert to object method
        variables['due_date'] = moment(variables['due_date']).fromNow();
        variables['priority'] = STAR_IMPORTANCE_STATE;
        variables['subtasks'] = complex_task_subtasks()
        variables['sort_order'] = TASKS.length

        // var task = new Task(variables)
        // TASKS.push(renderTask(task))
        // localstorage_save(task)

        complex_task_defaults()
        console.log(variables)
    });
})