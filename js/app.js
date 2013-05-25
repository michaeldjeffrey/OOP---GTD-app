// JSON stringify to store in local storage
// JSON parse to read from local storage
$(function(){
	var tasks = [];
	//fill tags array when tasks are recieved from local storage
	var tagsArray = [];
	
	$('#addBtn').on('click', function(e){
		e.preventDefault();
		var value = $('#addText').val();	
		tasks.push(makeTask(new Task({text: value, priority: 0})));
		$('#taskTitle').val('');
	});

	$("#optionsAdd").on('click', function(){
		var title = $(".taskTitle");
		var description = $("#optionsDescription");
		var tags = $("#optionsTags");
		var duedate = $("#clockpick").val() + $("#datepicker").val();
		var task = new Task({
			text: title.val(),
			description: description.val(),
			tags: tags.val(),
			due_date: duedate,
			// priority: priority,
			// repeat: repeat,
		});
		tasks.push(makeTask(task));
		$("#myModal").modal('hide');
		title.val('');
		description.val('');
		tag.val('');
		duedate.val('');
	});
	
	$(".taskTitle").keyup(function(){
		$(".taskTitle").val($(this).val());
	});
	


	function makeTask (i, task){
		var ac_group = $(document.createElement('div'))
					.addClass('accordion-group');
		var ac_heading = $(document.createElement('div'))
					.addClass('accordion-heading text-left')
		var ac_toggle = $(document.createElement('a'))
					.addClass('accordion-toggle')
					.attr('data-toggle', 'collapse')
					.attr('data-parent', '#accordion2')
					.attr('href','#collapse'+i) // Specific to each accordion instance
					.text(task.text);


		var collapse = $(document.createElement('div'))
					.addClass('accordion-body collapse')
					.attr('id', 'collapse'+i); // Specific to each accordion instance
		var ac_inner = $(document.createElement('div'))
					.addClass('accordion-inner');
		var p1 = $(document.createElement('p'))
					.addClass('text-right')
					.text('Due in 2 hours'); // Specific to each accordion instance
		var p2 = $(document.createElement('p'))
					.text(task.description);

		ac_inner.append(p1).append(p2);
		collapse.append(ac_inner)


		ac_heading.append(ac_toggle)
		ac_group.append(ac_heading).append(collapse)
		$(".accordion").append(ac_group);
		
		return task;
	}
	//might need l8er
/*	$.each(tasks, function(index, value){
		makeTask(index, value)
	});*/





$("#optionsTags").select2({
  tags:tagsArray,
  tokenSeparators: [",", " "]
}).on("select2-selecting", function(e) { 
	tagsArray.push(e.val);
});
$("#clockpick").clockpick();
$("#datepicker").datepicker();
	}

});