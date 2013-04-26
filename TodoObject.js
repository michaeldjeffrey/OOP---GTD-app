function Task (text, description, priority, tags, due_date, has_alert, repeated) {
	this._id = // init to number of tasks +1
	this.status = // init to incomplete
	this.text = text // init to text
	this.description = description || null // init to description if provided
	this.priority = // init to medium
	this.tags = [] // init to empty array
	this.subtasks = [] // init to empty array
	this.is_parent = // init to false
	this.date_created = // init to current date
	this.due_date = // init to null
	this.has_alert = // init to false
	this.repeated = {} // init to empty object
	this.sort_order = // init to 0
}

Task.prototype = {
	remove: function(self) {
		//remove self
	}
	add_tags: function(tags) {
		//push tags into this.tags
	}
	add_subtask: function(subtask) {
		//push child into this.subtasks
	}
	set_sort_order: function(order) {
		//set this to new order
		//change other objects accordingly
	}
	set_priority: function(priority) {
		//set this.prioroty to priority
	}
	set_alert: function(alert) {
		//set this.alert to alert
		//I believe this is a boolean value
	}
	set_due_date: function(due_date) {
		//set this.due_date to due_date
	}
	set_repeated: function(obj) {
		// set repeated to obj
	}
	set_status: function(status) {
		// set this.status to status
	}
	set_text: function(text) {
		// set this.text to text
	}
	set_description: function(description) {
		// set this.description to description
	}
};