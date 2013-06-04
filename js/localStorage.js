function saveTask_localStorage (task) {
	localStorage.setItem(localStorage.length + 1, JSON.stringify(task));
}

function retrieve_localStorage(){
	var a = [];
	for ( var i = 0; i < localStorage.length; i++){
		a.push(JSON.parse(localStorage.getItem(i)));
  }
  // console.log('from retrieve localStorage',a);
  return a;
}