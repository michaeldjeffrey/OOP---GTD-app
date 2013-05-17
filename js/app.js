// JSON stringify to store in local storage
// JSON parse to read from local storage
$(function(){


	var obj1 = new Task({
 		text : 'Task 1 playa',
		description : 'This is the first task that we are trying to render',
		priority : 0,
	});	
	var obj2 = new Task({
 		text : 'Task 2 Michael',
		description : 'This is the second task that we are trying to render',
		priority : 1,
	});
	var obj3 = new Task({
 		text : 'Task 3 Jake',
		description : 'This is the third task that we are trying to render',
		priority : 2,
	});
	var tasks = [obj1,obj2,obj3]

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
	}

	$.each(tasks, function(index, value){
		makeTask(index, value)
	})
});