// require user to provide text
function Task (obj) {
	// console.log('Task object created', obj)
	// this._id = Math.floor(Math.random()*100) // init to number of tasks +1

	this._id = obj._id == 'null' ? 0 : obj._id // init to number of tasks +1
	this.status = obj.status || 'incomplete' // init to incomplete
	this.text = obj.text || throwErr("need text to make a task") //throw "Text Required"
	this.description = obj.description || null; //throwErr('need a description so you know what to do ') // init to description if provided
	this.priority = obj.priority // init to low

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

	    collapse_id = this._id;
	    due_date = this.due_date;
	    title = this.text;
	    // if description is null, set to false
	    description = (this.description !== '') ? this.description: false;
	    completed_state = this.status;
	    priority = this.priority;
	    // if tags is not greater than zero, set to false
	    console.log(this.tags)
	    tags = (this.tags[0] !== '') ? this.tags : false;
	    subtasks = (this.subtasks.length > 0) ? this.subtasks : false;

	    _title = TASK_ELEMENT.replace(/{collapse_id}/g, collapse_id)
	    _title = _title.replace("{due_date}", due_date)
	    _title = _title.replace("{title}", title)
	    _title = _title.replace(/{completed_state}/g, completed_state)
	    _title = _title.replace("{completed_state_class}", TASK_STATUS[completed_state])
	    _title = _title.replace("{importance}", priority)
	    _title = _title.replace("{priority}", STAR_IMPORTANCE[priority]['star'])

	    if(description || tags || subtasks){
	    	console.log(description, tags, subtasks)
	        _body = COLLAPSE_ELEMENT.replace('{collapse_id}', collapse_id)

	        // turn into empty string if it doesn't exist
	        description = description ? description : '';
	        tags = tags ? build_tags(tags) : '';
	        subtasks = subtasks ? build_subtasks(subtasks) : '';

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
	}
}


function throwErr(msg){
	// throw new Error(msg)
}