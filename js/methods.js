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