function Task (obj) {
	console.log('Task object created', 'obj: ' + obj)
	this.obj = obj || null;

	this._id = Math.floor(Math.random()*100) // init to number of tasks +1
	this.status = this.obj.status || 'incomplete' // init to incomplete
	this.text = this.obj.text || null //throw "Text Required" // init to text
	this.description = this.obj.description || null // init to description if provided
	this.priority = this.obj.priority || 'low' // init to low

	this.tags = [];
	if(this.obj.tags !== undefined){ 
		this.add_tags(this.obj.tags)
	}

	this.subtasks = [];
	if(this.obj.subtasks !== undefined){
		this.add_subtask(this.obj.subtasks);
	}

	//this.is_parent initialized within subtask setting
	this.date_created = this.obj.date_created || new Date(); // init to current date
	this.due_date = this.obj.due_date || null // init to null
	this.has_alert = this.obj.has_alert || false // init to false

	// make an object standard for tasks that are repeated
	this.repeated = {} // init to empty object
	this.sort_order = this.obj.sort_order // || // function that places it at the bottom // init to 0
}

Task.prototype = {
	remove: function(self) {
		//remove self
	},
	add_tags: function(tags) {
		if(tags !== undefined){
			for( var tag in tags){
				this.tags.push(tags[tag]) //double check that this pushes values correctly
			}
		}
	},
	add_subtask: function(subtask) {
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
	set_sort_order: function(order) {
		//set this to new order
		//change other objects accordingly
		this.sort_order = order;
	},
	set_priority: function(priority) {
		//set this.prioroty to priority
		this.priority = priority;
	},
	set_alert: function(alert) {
		//set this.alert to alert
		//I believe this is a boolean value
		this.has_alert = true;
		// this.alert = alert; // May be used in future for custom alerts
	},
	set_due_date: function(due_date) {
		//set this.due_date to due_date
		this.due_date = due_date;
	},
	set_repeated: function(obj) {
		// set repeated to obj
		this.repeated = obj;
	},
	set_status: function(status) {
		// set this.status to status
		this.status = status;
	},
	set_text: function(text) {
		// set this.text to text
		this.text = text;
	},
	set_description: function(description) {
		// set this.description to description
		this.description = description;
	}
};