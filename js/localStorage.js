function saveTask_localStorage (task) {
	localStorage.setItem(task._id, JSON.stringify(task));
}

function retrieve_localStorage(){
	var a = [];
	for ( var i = 0; i < localStorage.length; i++){
		a.push(new Task(JSON.parse(localStorage.getItem(i))));
  }
  console.log('from retrieve localStorage',a);
  return a;
}
function removeTask_localStorage(task){
	if(task !== null || task !== undefined){
    var temp = retrieve_localStorage();
    localStorage.clear()
    temp.splice(task._id, 1);
    temp.forEach(function(n,i){
      n._id = i;
      saveTask_localStorage(n);
    })
 	}
}