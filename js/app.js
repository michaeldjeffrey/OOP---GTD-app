// JSON stringify to store in local storage
// JSON parse to read from local storage
$(function(){
	var tasks = [];
	//fill tags array when tasks are recieved from local storage
	var tagsArray = [];

	$('.icon').tooltip();

	function makeSortable(){
		if(tasks.length === 2){
			$( ".accordion" ).sortable();
			$( ".accordion" ).disableSelection();
		}
	}
	
	$('#addBtn').on('click', function(e){
		e.preventDefault();
		var value = $('#addText').val();	
		tasks.push(makeTask(new Task({text: value, priority: 0})));
		$('.taskTitle').val('');
<<<<<<< HEAD
=======
		makeSortable()
>>>>>>> jake_features
	});

	$("#optionsAdd").on('click', function(){
		var title = $(".taskTitle");
		var description = $("#optionsDescription");
		var tags = $("#optionsTags");
		var date = $("#datepicker");
		var time = $("#clockpick");
		var duedate = time.val() + " " + date.val();
		var dueFromNow = moment(duedate).fromNow();   //.format("h a dddd M/D");
		var task = new Task({
			text: title.val(),
			description: description.val(),
			tags: tags.val(),
			due_date: dueFromNow,
			// priority: priority,
			// repeat: repeat,
		});
		tasks.push(makeTask(task));
		console.log(task);
		$("#myModal").modal('hide');
		title.val('');
		description.val('');
		tags.select2('data', null)
		date.val('');
		time.val('');
		makeSortable()
	});
	
	$(".taskTitle").keyup(function(){
		$(".taskTitle").val($(this).val());
	});
	


	function makeTask (task){
		var i = tasks.length;
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
		var ac_due = $(document.createElement('span'))
					.addClass('pull-right')
					.text('Due ' + task.due_date);

		var collapse = $(document.createElement('div'))
					.addClass('accordion-body collapse')
					.attr('id', 'collapse'+i); // Specific to each accordion instance
		var ac_inner = $(document.createElement('div'))
					.addClass('accordion-inner');
		var p1 = $(document.createElement('p'))
					.text(task.description);

		ac_inner.append(p1);
		collapse.append(ac_inner);

		ac_toggle.append(ac_due);
		ac_heading.append(ac_toggle);
		ac_group.append(ac_heading).append(collapse);
		$(".accordion").append(ac_group);

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

});