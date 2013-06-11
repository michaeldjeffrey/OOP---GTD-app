function saveTask_localStorage (task) {
	localStorage.setItem(task._id, JSON.stringify(task));
}

function retrieve_localStorage(){
	var a = [];
	for ( var i = 0; i < localStorage.length; i++){
		a.push(JSON.parse(localStorage.getItem(i)));
  }
  console.log('from retrieve localStorage',a);
  return a;
}
function removeFrom_localStorage(task){
	if(task !== null || task !== undefined){
 	 localStorage.removeItem(task._id);
 	}
}