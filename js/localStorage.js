function saveTask_localStorage (task) {
	localStorage.setItem(task.id, JSON.stringify(task));
}

function retrieve_localStorage(){
	var a = [];
	for ( var i = 0; i < localStorage.length; i++){
		a.push(new Task(JSON.parse(localStorage.getItem(i))));
  }
  return a;
}
function removeTask_localStorage(task){
	if(task !== null || task !== undefined){
    var temp = retrieve_localStorage();
    localStorage.clear()
    temp.splice(task.id, 1);
    temp.forEach(function(n,i){
      n.id = i;
      saveTask_localStorage(n);
    })
 	}
}