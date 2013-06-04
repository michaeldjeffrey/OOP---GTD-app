function saveTask_localStorage (task) {
	localStorage.setItem(task._id, JSON.stringify(task));
}

function retrieve_localStorage(){
	var a = [];
	for ( var i = 0; i < localStorage.length+1; i++){
		a.push(JSON.parse(localStorage.getItem(i)));
  }
  // console.log('from retrieve localStorage',a);
  return a;
}