// require user to provide text
function Task (obj) {
	// console.log('Task object created', obj)
	// this.id = Math.floor(Math.random()*100) // init to number of tasks +1

	this.id = obj.id == 'null' ? 0 : obj.id // init to number of tasks +1
	this.status = obj.status || 'incomplete' // init to incomplete
	this.text = obj.text || throwErr("need text to make a task") //throw "Text Required"
	this.description = obj.description || null; //throwErr('need a description so you know what to do ') // init to description if provided
	this.priority = obj.priority || 0 // init to low

	this.tags = [];
	if(obj.tags !== undefined){
		this.add_tags(obj.tags)
	}

	this.subtasks = [];
	if(obj.subtasks !== undefined){
		this.add_subtasks(obj.subtasks);
	}

	//this.is_parent initialized within subtask setting
	this.date_created = obj.date_created || new Date();
	this.due_date = obj.due_date || 'Today';
	this.alert = obj.alert || false

	// make an object standard for tasks that are repeated
	this.repeated = {} // init to empty object
	this.sort_order = obj.sort_order // || // function that places it at the bottom // init to 0
}

Task.prototype = {
	constructor: Task,
	remove: function(self) {
		//remove self
		this = null;
	},
	add_tags: function(tags) {
		if(tags !== undefined){
			for( var tag in tags){
				this.tags.push(tags[tag]) //double check that this pushes values correctly
			}
		}
	},
	add_subtasks: function(subtask) {
		// Think of way to generate subtasks before regular tasks to be inserted
		if(subtask !== undefined){
			this.is_parent = true;
			for( var task in subtask){
				var newTask = new Task(subtask[task])
				this.subtasks.push(newTask) //double check that this pushes values correctly
			}
		} else if(typeof this.subtasks == 'undefined') {
			this.is_parent = false;
		}
	},
	render: function(){
		var collapse_id, due_date, title, description, completed_state, priority, tags;
	    var _title, _body;

	    collapse_id = this.id;
	    due_date = this.due_date;
	    title = this.text;
	    // if description is null, set to false
	    description = (this.description !== '') ? this.description: false;
	    completed_state = this.status;
	    priority = this.priority;
	    // if tags is not greater than zero, set to false
	    tags = (this.tags[0] !== '' && this.tags.length > 0) ? this.tags : false;
	    subtasks = (this.subtasks.length > 0) ? this.subtasks : false;

	    _title = TASK_ELEMENT.replace(/{collapse_id}/g, collapse_id)
	    _title = _title.replace("{due_date}", due_date)
	    _title = _title.replace("{title}", title)
	    _title = _title.replace(/{completed_state}/g, completed_state)
	    _title = _title.replace("{completed_state_class}", TASK_STATUS[completed_state])
	    _title = _title.replace("{importance}", priority)
	    _title = _title.replace("{priority}", STAR_IMPORTANCE[priority]['star'])

	    if(description || tags || subtasks){
	        _body = COLLAPSE_ELEMENT.replace('{collapse_id}', collapse_id)

	        // turn into empty string if it doesn't exist
	        description = description ? description+'<br/>' : '';
	        tags = tags ? this.build_tags()+'<br/>' : '';
	        subtasks = subtasks ? this.build_subtasks()+'<br/>' : '';

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
	    return this;
	},
	build_subtasks: function(){
	    // TODO: make this display nicer output
	    var temp_string = '';
	    $.each(this.subtasks, function(key, value){
	        temp_string += value.text+", "
	    })
	    return temp_string;
	},
	build_tags: function(){
		var temp_string = '';
		$.each(this.tags, function(key, value){
	        // TODO: replace &emsp; with a class
	        temp_string += '<span class="label label-info">'+ value +'</span>&emsp;'
		})
	    return temp_string
	},
	save: function(){
		localStorage.setItem(this.id, JSON.stringify(this))
		return this;
	},
	remove: function(){
		// remove from list
		TASKS.splice(this.id, 1)
		// give remaining task new id's
		for (var task = 0; task < TASKS.length; task++) {
	        $("#task_wrapper").find('[data-id="'+TASKS[task].id+'"]').data('id', task)
	        TASKS[task].id = task;
	    };
	    // resave them into localstorage
	    localStorage.clear()
	    for(task in TASKS){
	        TASKS[task].save()
	    }
	    return this;
	},
	setStatus: function(val){
		this.status = val;
		return this;
	},
	setPriority: function(val){
		this.priority = val;
		return this;
	}
}


function throwErr(msg){
	// throw new Error(msg)
}