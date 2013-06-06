// JSON stringify to store in local storage
// JSON parse to read from local storage
	var tasks = retrieve_localStorage()
$(function(){
	//fill tags array when tasks are recieved from local storage
	var tagsArray = [];
	

	$('.hasTooltip').tooltip();

	function makeSortable(){
		if(tasks.length === 2){
			$( ".accordion" ).sortable().disableSelection();
		}
	}
	
	$('#addBtn').on('click', function(e){
		e.preventDefault();
		var value = $('#addText').val();	
		var task = new Task({text: value, priority: 0})
		tasks.push(makeTask(task));
		saveTask_localStorage(task)
		$('.taskTitle').val('');
		makeSortable()
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
			// repeat: repeat,
		});
		tasks.push(makeTask(task));
		saveTask_localStorage(task)
		console.log(task);
		$("#myModal").modal('hide');
		title.val('');
		description.val('');
		tags.select2('data', null)
		date.val('');
		time.val('');
		starDefault();
		makeSortable()
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
		console.log('makeTask called')
		var i = tasks.length;
		var ac_group = $(document.createElement('div'))
					.addClass('accordion-group')
					.attr('id', task._id)
		var ac_heading = $(document.createElement('div'))
					.addClass('accordion-heading text-left')
					.prepend("<input type='checkbox' class='status'>")
					if(task.status == "completed"){
						console.log("adding completed class")
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
					.addClass("icon-check-empty checkStyle pull-left") // hasTooltip")
					.attr('id', 'check' + i);
					//.attr('data-toggle', 'tooltip')
					//.attr('title', 'click to select');
					checkPriorityNum();
		var ac_priority = $(document.createElement('i'))  //make this: <i class="icon-star-empty"></i>
					.addClass(setStar + " starStyle pull-left")// hasTooltip")
					.attr('id', 'itemStar' + i);
					//.attr('data-toggle', 'tooltip')
					//.attr('title', 'click to change importance');
		var ac_line = $(document.createElement('div'))
					.addClass("sepLine pull-left");
		var collapse = $(document.createElement('div'))
					.addClass('accordion-body collapse')
					.attr('id', 'collapse' + i); // Specific to each accordion instance
		var ac_inner = $(document.createElement('div'))
					.addClass('accordion-inner');
		var p1 = $(document.createElement('p'))
					.text(task.description);

		ac_inner.append(p1);
		collapse.append(ac_inner);

		ac_toggle.append(ac_check).append(ac_priority).append(ac_line).append(ac_due);
		ac_heading.append(ac_toggle);
		ac_group.append(ac_heading)//.append(collapse);
		if(task.description !== null || task.subtasks !== null){
			ac_group.append(collapse);
			for (var sub = 0; sub < task.subtasks.length; sub++) {
				collapse.append("<div class='alert alert-info'>"+task.subtasks[sub].text+"</div>")
			}
			
		}
		$(".accordion").append(ac_group);

	$("#"+task._id).find(".status").on('change', function(){
		var comp = $(this).parent().parent().prop('id');
		var status;
		if($(this).prop('checked') == true){
			$(this).parent().addClass('completed');
			status = 'completed';
		} else {
			$(this).parent().removeClass('completed');
			status = "incomplete";
		}
		for (var i = 1; i < tasks.length; i++) {
				if(comp == tasks[i]._id) tasks[i].status = status
		}
	})
		$("#itemStar" + i).on('click', function(e){
			e.stopPropagation();
			priorityNum++
			if(priorityNum === 3){
				priorityNum = 0;
			}
			checkPriorityNum()
			$(this).removeClass().addClass(setStar + ' starStyle pull-left'); // hasTooltip');
		});

		var setCheck = "icon-check-empty checkStyle";
		$("#check" + i).on('click', function(e){
			e.stopPropagation();
			if(setCheck === "icon-check-empty checkStyle"){
				setCheck = "icon-check-sign checkedStyle"
			}else{
				setCheck = "icon-check-empty checkStyle"
			}
			$(this).removeClass().addClass(setCheck + ' pull-left'); // hasTooltip');
		});

		//$('.hasTooltip').tooltip();

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
		console.log("making task", i)
		makeTask(tasks[i]);
	}

});