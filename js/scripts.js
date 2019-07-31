dep_template = '<div class="row data">\
					<div class="cell">\
						<span>Cook</span>\
						<div id="button_block">\
							<img src="icon_edit.png" class="edit_button">\
							<img src="icon_delete.png" class="remove_button">\
						</div>\
					</div>\
				</div>';
dep_template = new DOMParser().parseFromString(dep_template, 'text/html').body.lastChild;

emp_template = '<div class="row data">\
					<div class="cell">\
						<span>Full Name</span>\
					</div>\
					<div class="cell">\
						<span>Department</span>\
					</div>\
					<div class="cell">\
						<span>Date of brith</span>\
					</div>\
					<div class="cell">\
						<span>Salary</span>\
						<div id="button_block">\
							<img src="icon_edit.png" class="edit_button">\
							<img src="icon_delete.png" class="remove_button">\
						</div>\
					</div>\
				</div>';
emp_template = new DOMParser().parseFromString(emp_template, 'text/html').body.lastChild;

isEdit = false;
pageTitle = document.title;


// action button '+'
document.getElementById('add_button').onclick = function() {
	scrollOffset = window.pageYOffset
	show_edit_field()
	window.scrollBy(0, document.body.scrollHeight)
	document.getElementsByTagName('input')[0].value = ''
}

function render_emp_row(row) {
	row.getElementsByTagName('span')[0].innerText = fullName
	row.getElementsByTagName('span')[1].innerText = department
	row.getElementsByTagName('span')[2].innerText = brith
	row.getElementsByTagName('span')[3].innerText = salary
	return row
}

// button '✔'
document.getElementById('ok_button').onclick = function() {
	if (pageTitle == 'Department') {
		// get text from input field
		inputText = document.getElementById('dep_name').value
		if (inputText) {
			// clear input field
			
			// if this is an edit mode
			if (isEdit) {
				row.style.background = 'white'
				isEdit = false
				window.scrollTo(0, scrollOffset)
				if (oldText[0].innerText != inputText) {
					oldText[0].innerText = inputText	
				} 
			}
			else {
				new_data = dep_template.cloneNode(true)
				new_data.getElementsByTagName('span')[0].innerText = inputText
				document.getElementsByClassName('data_table')[0].appendChild(new_data)
			}
		
		}
	} else if (pageTitle == 'Employee') {
		fullName = document.getElementById('fullname').value
		department = document.getElementById('department').value
		brith = document.getElementById('brith').value
		salary = document.getElementById('salary').value
		inputs = [fullName, department, brith, salary]
		if (fullName || department || brith || salary) {
			if (isEdit) {
				row.style.background = 'white'
				isEdit = false
				window.scrollTo(0, scrollOffset)
				render_emp_row(row)
			}
			else {
				empty_row = emp_template.cloneNode(true)
				row = render_emp_row(empty_row)
				document.getElementsByClassName('data_table')[0].appendChild(row)
			}
		
		}
	}
	hide_edit_field()
	
}

function hide_edit_field() {
	document.getElementById('ok_button').style.display = 'none';
	document.getElementById('add_button').style.display = 'block';
	document.getElementById('input_block').style.display = 'none';
}

function show_edit_field() {
	document.getElementById('ok_button').style.display = 'block';
	document.getElementById('add_button').style.display = 'none';
	document.getElementById('input_block').style.display = 'block';
}
	// function of deleting a row
	function remove_row() {
		this.parentElement.parentElement.parentElement.remove();
	}

	// row editing function
	function edit_row() {
		if (!isEdit) {
			document.getElementsByTagName('input')[0].value = ''
			scrollOffset = window.pageYOffset
			isEdit = true
			row = this.parentElement.parentElement.parentElement
			row.style.background = '#e9e9e9'
			document.getElementById('ok_button').style.display = 'block';
			document.getElementById('add_button').style.display = 'none';
			document.getElementById('input_block').style.display = 'block'
			window.scrollBy(0, document.body.scrollHeight)
			if (pageTitle == 'Department') {
				oldText = [row.getElementsByTagName('span')[0]]
				document.getElementsByTagName('input')[0].value += oldText[0].innerText
			} else if (pageTitle == 'Employee') {
				[fullName, department, brith, salary] = Array.from(row.getElementsByTagName('span')).map(el => {return el.innerText})
				document.getElementById('fullname').value = fullName
				document.getElementById('department').value = department
				document.getElementById('brith').value = brith 
				document.getElementById('salary').value = salary
			}
			
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
