// JSON stringify to store in local storage
// JSON parse to read from local storage
var tasks = retrieve_localStorage();
$(function(){
	//fill tags array when tasks are recieved from local storage
	var tagsArray = [];
	var autoCompleteTags = [];
	for (var i = 0; i < tasks.length; i++) {
		makeTask(tasks[i]);
		if(tasks[i].tags.length !== 0){
			for (var t = 0; t < tasks[i].tags.length; t++) {
				autoCompleteTags.push(tasks[i].tags[t])
			}
		}
	}



	$('.hasTooltip').tooltip();

	function makeSortable(){
		$(".accordion").sortable({
        stop:function(event,ui){
        console.log('stop function invoked');
        makeSortable();
    }}).disableSelection();
	}
	$("#trash").droppable({
    activeClass: 'active',
    drop:function(event,ui){
    	event.stopPropagation();
      var itemId = ui.draggable.attr('id');
      $('#' + itemId).remove();
      tasksIndex = itemId;
      var t = tasks[tasksIndex];
      removeFrom_localStorage(t);
    }
  });
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
			tags: tagsArray,
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
		// tagsArray = [];

	});

	$(".taskTitle").keyup(function(){
		$(".taskTitle").val($(this).val());
	});

	$("#appendedInputButton")
		.autocomplete({
			source: autoCompleteTags,
			minLength: 0
		})
		.bind('focus', function(){
			$(this).autocomplete('search');
		});


	$("#appendedInputButton").on('keyup', function(){
		var val = $(this).val()
		if(val == ''){
			removeFade()
		} else {
			var filt = $.grep(tasks, function(n,i){
				if(n.tags.length !== 0){
					for (var t = 0; t < n.tags.length; t++) {
						if(n.tags[t].indexOf(val) == 0){
							return n;
						}
					}
				}
			})
			removeFade()
			filt.forEach(function(n, i){
				$("#"+n._id).removeClass('fade')
			})
		}
	})

	function removeFade(){
		$(".fade").removeClass('fade')
	}

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
		if(task !== null){
			var hasDescription = false;
			var hasSubtasks = false;
			var hasTags = false;
			var i = task._id;
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
						var tagsList = $(document.createElement('ul'))
						for(var tag = 0; tag < task.tags.length; tag++){
							tagsList.append("<li>"+task.tags[tag]+"</li>")
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
						if(task.tags.length > 0){
							hasTags = true;
							collapse.append(tagsList)
						}

						ac_toggle.append(ac_check).append(ac_priority).append(ac_line).append(ac_due);
						ac_heading.append(ac_toggle);
						ac_group.append(ac_heading)

						if(hasDescription === true || hasSubtasks === true || hasTags === true){
							ac_group.append(collapse);
							ac_toggle.addClass('accordion-hover');
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
							for (var i = 0; i < tasks.length; i++) {
								console.log('task ids from creation', tasks[i]._id)
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
	}

	$("#optionsTags").select2({
		tags:tagsArray,
		tokenSeparators: [",", " "]
	}).on("select2-selecting", function(e) {
		tagsArray.push(e.val);
	});
	$("#clockpick").clockpick();
	$("#datepicker").datepicker();



});