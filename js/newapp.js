var TASKS = localstorage_retrieve();
$(function(){
//====================== MAKE TASKS FROM LOCALSTORAGE ========================
    for(task in TASKS){
        var task = TASKS[task];
        task.render()
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
        tokenSeparators: [',', ' '],
        width: '100%',
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
    // Make the tasks resortable
    $("#task_wrapper").sortable({
        connectWith: '#trash',
        stop: resort_tasks_on_drag_stop
    }).disableSelection();
    // Drop the tasks on the trash to delete them
    $("#trash").droppable({
        accept: ".accordion-group",
        hoverClass: "active",
        drop: function(event, ui) {
            ui.draggable.remove();
        }
    });
//=========================== SEARCH BY TAGS =============================
    $("#search").autocomplete({
        source: AUTOCOMPLETE_TAGS,
        minLength: 0
    }).bind('focus', function(){
        $(this).autocomplete('search')
    });
    $("#search").on('keyup', function(){
        var val = $(this).val();
        if(val == ''){
            unfade_all_tasks();
        } else {
            var filter = $.grep(TASKS, function(task, key){
                if(task.tags.length !== 0){
                    for(tag in task.tags){
                        if(task.tags[tag].indexOf(val) == 0){
                            return task;
                        }
                    }
                }
            })
            fade_all_tasks();
            $.each(filter, function(key, value){
                $("#task_wrapper").find("[data-id='"+value.id+"']").removeClass('fade')
            })
        }
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
    });
    // add subtask field
    $("#complex_task_add_subtask").on('click', function(){
        $(this).parent().append("<br><input class='clearfix input-large' type='text' name='subtask_title' placeholder='subtask title'> ")
    });
    // When a tasks checkmark is clicked
    $('#task_wrapper').on('click', "[id^='check_']", function(e){
        e.stopPropagation();
        var active_task = $(this).closest('.accordion-group').data("id")
        for(task in TASKS){
            if(TASKS[task].id == active_task){
                TASKS[task].status = TASKS[task].status == 'incomplete' ? 'completed' : 'incomplete';
                localstorage_save(TASKS[task])
            }
        }
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
        var active_task = $(this).closest('.accordion-group').data('id');
        for(task in TASKS){
            if(TASKS[task].id == active_task){
                console.log(TASKS[task])
                TASKS[task].priority = star;
                console.log(TASKS[task])
                localstorage_save(TASKS[task])
            }
        }
    })

//============================== ADDING TASKS =====================================
    // add simple task
    $('#add_simple_task').on('click', function(e){
        e.preventDefault();
        var text = $("#simple_task_text");
        var task = new Task({text: text.val(), priority: 0, id: TASKS.length});
        task.render().save()
        TASKS.push(task)
        $(".task-title").val('');
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
        variables['id'] = TASKS.length

        var task = new Task(variables)
        task.render().save()
        TASKS.push(task)

        complex_task_defaults()
    });
})
