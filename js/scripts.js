	isEdit = false;

	// button '+'
	document.getElementById('add_button').onclick = function() {
		document.getElementById('ok_button').style.display = 'block';
		document.getElementById('add_button').style.display = 'none';
		document.getElementById('input_block').style.display = 'block';
	}

	// button '✔'
	document.getElementById('ok_button').onclick = function() {
		var inputText = document.getElementsByTagName("input")[0].value;
		if (inputText) {
			if (isEdit) {
				if (oldText != inputText) {
					oldText.innerText = inputText
					row.style.background = 'white'
					isEdit = false
				}
			}
			else {
				var new_data = document.createElement('div')
				new_data.className = 'row data'
				new_data.innerHTML = '<div class="cell"><span>' + inputText + '</span><img src="icon_edit.png" class="edit_button"><img src="icon_delete.png" class="remove_button"></div>'
				document.getElementsByClassName('data_table')[0].appendChild(new_data)
			}

			document.getElementsByTagName('input')[0].value = ''
			document.getElementById('ok_button').style.display = 'none';
			document.getElementById('add_button').style.display = 'block';
			document.getElementById('input_block').style.display = 'none';
		}
	}

	// function of deleting a row
	function remove_row() {
		this.parentElement.parentElement.remove();
	}

	// row editing function
	function edit_row() {
		if (!isEdit) {
			isEdit = true
			row = this.parentElement.parentElement
			row.style.background = '#e9e9e9'
			document.getElementById('ok_button').style.display = 'block';
			document.getElementById('add_button').style.display = 'none';
			document.getElementById('input_block').style.display = 'block'
			oldText = row.getElementsByTagName('span')[0]
			document.getElementsByTagName('input')[0].value += oldText.innerText
		} 

	}

	// update tracking function
	var observer = new MutationObserver(function(mutations) {
  		mutations.forEach(function(mutation) {
  			if (mutation.addedNodes.length) {
    			[btn_edit, btn_remove] = mutation.addedNodes[0].getElementsByTagName('img')
    			btn_edit.onclick = edit_row
    			btn_remove.onclick = remove_row }});});
	observer.observe(document.getElementsByClassName('data_table')[0], {childList: true})

	// hang action on click
	var el = document.querySelectorAll(".remove_button");
	for (var i = 0; i < el.length; i++) {
		el[i].onclick = remove_row
	}

	var el = document.querySelectorAll(".edit_button");
	for (var i = 0; i < el.length; i++) {
		el[i].onclick = edit_row
	}
