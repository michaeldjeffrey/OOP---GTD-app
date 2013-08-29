// require user to provide text
function Task (obj) {
	//console.log('Task object created', 'obj: ' + JSON.stringify(obj))
	// this._id = Math.floor(Math.random()*100) // init to number of tasks +1
	this._id = obj._id || localStorage.length; // init to number of tasks +1
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
		this.add_subtask(obj.subtasks);
	}

	//this.is_parent initialized within subtask setting
	this.date_created = obj.date_created || new Date(); // init to current date
	this.due_date = obj.due_date || 'Today' // init to null
	this.alert = obj.alert || false // init to false

	// make an object standard for tasks that are repeated
	this.repeated = {} // init to empty object
	this.sort_order = obj.sort_order // || // function that places it at the bottom // init to 0


}

Task.prototype = {
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
	}
};
Object.defineProperty(Task.prototype, 'priority',{
	enumerable: true,
	get: function(){
		// return index from array
		return PriorityMap[this._priority];
	},
	set: function(pri){
		this._priority = pri;
	}
});

PriorityMap = ["Not Important",'Important','Very Important']
$(function(){
	$('a').on('click',function(){
		new Task({})
	})
})

function throwErr(msg){
	// throw new Error(msg)
}