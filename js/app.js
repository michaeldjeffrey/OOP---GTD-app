// JSON stringify to store in local storage
// JSON parse to read from local storage
var tasks = retrieve_localStorage()
$(function(){
	//fill tags array when tasks are recieved from local storage
	var tagsArray = [];
	

	$('.hasTooltip').tooltip();

	function makeSortable(){
		if(tasks.length > 2){
			$( ".accordion" ).sortable().disableSelection();
		}
	}
	
	$('#addBtn').on('click', function(e){
		e.preventDefault();
		var value = $('#addText').val();	
		var task = new Task({text: value, priority: 0, sort_order: tasks.length})
		tasks.push(makeTask(task));
		saveTask_localStorage(task)
		$('.taskTitle').val('');
		
	});

	$(".addSubTask").on('click', function(){
		$(this).parent().append("<br><input class='clearfix input-large' type='text' name='subTaskTitle' placeholder='subtask title'> ")
	})

	$("#optionsAdd").on('click', function(){
		var title = $(".taskTitle");
		var description = $("#optionsDescription");
		var tags = $("#optionsTags");
		var date = $("#datepicker");
		var time = $("#clockpick");
		var duedate = time.val() + " " + date.val();
		var dueFromNow = moment(duedate).fromNow();   //.format("h a dddd M/D");
		var subtasks = [];
		$("[name='subTaskTitle']").each(function(i){
			if($(this).val().trim() !== '') subtasks.push({text: $(this).val()})
		})
		var priority = 0;
		var task = new Task({
			text: title.val(),
			description: description.val(),
			tags: tags.val(),
			due_date: dueFromNow,
			subtasks: subtasks,
			priority: priority,
			sort_order: tasks.length
			// repeat: repeat,
		});
		tasks.push(makeTask(task));
		saveTask_localStorage(task)
		$("#myModal").modal('hide');
		title.val('');
		description.val('');
		tags.select2('data', null)
		date.val('');
		time.val('');
		starDefault();
		
	});
	
	$(".taskTitle").keyup(function(){
		$(".taskTitle").val($(this).val());
	});

	
	var priorityNum = 0;

	function checkPriorityNum(){
		if(priorityNum === 0){
			setStar = 'icon-star-empty';
			starText = 'Not important';
		}else if(priorityNum === 1){
			setStar = 'icon-star-half-empty';
			starText = 'Important';
		}else{
			setStar = 'icon-star';
			starText = 'Very important';
		}
	}

	$('#setStar').on('click', function(){
		priorityNum++
		if(priorityNum === 3){
			priorityNum = 0;
		}
		checkPriorityNum()
		$('#star').removeClass().addClass(setStar + ' menuStarStyle');
		$('#starText').html(starText);
	});

	function starDefault(){
		priorityNum = 0;
		checkPriorityNum()
		$('#star').removeClass().addClass(setStar + ' menuStarStyle');
		$('#starText').html(starText);
	}


	function makeTask (task){
		var hasDescription = false;
		var hasSubtasks = false;
		var i = tasks.indexOf(task);
		var ac_group = $(document.createElement('div'))
		.addClass('accordion-group')
		.attr('id', task._id)
		var ac_heading = $(document.createElement('div'))
		.addClass('accordion-heading text-left')
					if(task.status == "completed"){
						ac_heading.addClass("completed");
					}
					var ac_toggle = $(document.createElement('a'))
					.addClass('accordion-toggle itemText')
					.attr('data-toggle', 'collapse')
					.attr('data-parent', '#accordion2')
					.attr('href','#collapse'+i) // Specific to each accordion instance
					.text(task.text)
					var ac_due = $(document.createElement('span'))
					.addClass('pull-right')
					.text('Due ' + task.due_date);

		var ac_check = $(document.createElement('i'))
					.attr('id', 'check' + i);
					if(task.status == 'completed'){
						var setCheck = 'icon-check-sign checkedStyle'
						ac_check.addClass("icon-check-sign checkedStyle pull-left")
					} else {
						var setCheck = 'icon-check-empty checkStyle'
						ac_check.addClass("icon-check-empty checkStyle pull-left");
					}
					checkPriorityNum();
		var ac_priority = $(document.createElement('i')) 
					.addClass(setStar + " starStyle pull-left")
					.attr('id', 'itemStar' + i);
					var ac_line = $(document.createElement('div'))
					.addClass("sepLine pull-left");
					var collapse = $(document.createElement('div'))
					.addClass('accordion-body collapse')
					.attr('id', 'collapse' + i); // Specific to each accordion instance
					var ac_inner = $(document.createElement('div'))
					.addClass('accordion-inner');
					var p1 = $(document.createElement('p'))
					.text(task.description);
					var stasks = $(document.createElement('div'))
					for (var sub = 0; sub < task.subtasks.length; sub++) {
						stasks.append("<div class='alert alert-info'>"+task.subtasks[sub].text+"</div>")
					}
					if(task.description !== null){
						hasDescription = true;
						ac_inner.append(p1);
					}
					collapse.append(ac_inner);
					if(task.subtasks.length > 0){
						hasSubtasks = true;
						collapse.append(stasks)
					}

					ac_toggle.append(ac_check).append(ac_priority).append(ac_line).append(ac_due);
					ac_heading.append(ac_toggle);
					ac_group.append(ac_heading)

					if(hasDescription === true || hasSubtasks === true){
						ac_group.append(collapse);
					}

					$(".accordion").append(ac_group);

					$("#itemStar" + i).on('click', function(e){
						e.stopPropagation();
						priorityNum++
						if(priorityNum === 3){
							priorityNum = 0;
						}
						checkPriorityNum()
			$(this).removeClass().addClass(setStar + ' starStyle pull-left'); // hasTooltip');
				});

					$("#check" + i).on('click', function(e){
						e.stopPropagation();
						var comp = $(this).parent().parent().parent().prop('id');
						var status;
						if(setCheck === "icon-check-empty checkStyle"){
							status = 'completed';
							setCheck = "icon-check-sign checkedStyle"
							$(this).parent().parent().addClass('completed')
						}else{
							status = 'incomplete';
							setCheck = "icon-check-empty checkStyle"
							$(this).parent().parent().removeClass('completed')
						}
						for (var i = 1; i < tasks.length; i++) {
							if(comp == tasks[i]._id){
								tasks[i].status = status;
								saveTask_localStorage(tasks[i])
							} 
						}
			$(this).removeClass().addClass(setCheck + ' pull-left'); // hasTooltip');
				});

		//$('.hasTooltip').tooltip();
		makeSortable()
		return task;

	}

	$("#optionsTags").select2({
		tags:tagsArray,
		tokenSeparators: [",", " "]
	}).on("select2-selecting", function(e) { 
		tagsArray.push(e.val);
	});
	$("#clockpick").clockpick();
	$("#datepicker").datepicker();



	for (var i = 1; i < tasks.length; i++) {
		makeTask(tasks[i]);
	}

});