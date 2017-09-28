document.onkeydown = function (e) {
	var ev = window.event || e;
	var code = ev.keyCode || ev.which;
	if (code == 116) {
    	if(ev.preventDefault) {
			ev.preventDefault();
			location.reload();
		} else {
			ev.keyCode = 0;
			ev.returnValue = false;
		}
	}
}
