let drNo = 1;
let holiday = ['2021/2/11', '2021/2/12', '2021/2/13', '2021/3/1', '2021/5/5', '2021/5/19', '2021/9/20', '2021/9/21', '2021/9/22', '2022/2/1', '2022/2/2', '2022/2/3', '2022/3/1', '2022/5/5', '2022/6/6', '2022/8/15', '2022/9/9', '2022/10/3'];
let ddElements = [];
let tableBody = document.getElementById('tableBody');
let dutyObj = {
	dr1: new createObjDr(),
	dr2: new createObjDr(),
	dr3: new createObjDr(),
	dr4: new createObjDr(),
	dr5: new createObjDr(),
	dr6: new createObjDr()
};
function generatePDF(){
	let doc = new jspdf.jsPDF("p", "mm", "a4");
	doc.addImage(dutyObj.dr1.img, 'JPEG', 0, 0, 18, 6);
	doc.save('dutyCalendar.pdf');
}
function addDoc(e){
	if (drNo > 6){
		return
	}
	let child = document.createElement('div');
	child.className = 'dr';
	child.classList.add('dr' + drNo);
	child.setAttribute('draggable', true);
	let field = document.getElementById('docName');
	let docName = field.value;
	document.getElementById('members').appendChild(child).appendChild(document.createTextNode(docName));
	dutyObj['dr' + drNo].name = docName;
	let drNoCopy = drNo;
	html2canvas(child).then(function(canvas){
		dutyObj['dr' + drNoCopy].img = canvas.toDataURL('image/jpeg');
	});
	let outputChild = document.getElementById('output').childNodes;
	for(let i = 0; i < outputChild.length ; i ++){
		let newChildDiv = document.createElement('div');
		newChildDiv.className = 'dr' + drNo;
		newChildDiv.style.width = '150px';
		newChildDiv.innerHTML = docName + ':&nbsp;&nbsp;&nbsp;0 시간';
		outputChild[i].appendChild(newChildDiv);
	}
	field.value = "";
	drNo++;
}

function initCalendar(){
	let today = new Date();
	let firstDay = new Date(today.setDate(1));
	let weekDay = firstDay.getDay();
	if (weekDay){
		firstDay.setDate(firstDay.getDate() - (weekDay-1));
	}else{
		firstDay.setDate(firstDay.getDate() - 6);
	}
	let day = new Date(firstDay);
	let table = document.getElementById('tableBody');
	for (let i = 0; i < 53; i++){
		let tr = table.appendChild(document.createElement('tr'));
		for (let i = 0; i < 7; i++){
			let date = (parseInt(day.getMonth()) + 1) + '/' + day.getDate();
			let fullDate = (parseInt(day.getFullYear())) + '/' + date;
			let td = document.createElement('td');
			td.className = 'tableCell';
			td.setAttribute('draggable', true);
			if ((day.getDay() === 0) || (day.getDay() === 6)){
				td.classList.add('colHoliday');
			}else{
				for(let i = 0; i < holiday.length; i++){
					if (fullDate === holiday[i]){
						td.classList.add('colHoliday');
						break;
					}
				}
			}
			tr.appendChild(td).innerHTML = date;
			day.setDate(day.getDate() + 1);
		}
	}
}
function initOutput(){
	let today = new Date();
	let child = document.getElementById('output').childNodes;
	let day = new Date(today);
	for(let i = 0; i < child.length; i++){
		child[i].innerHTML = day.getFullYear() + '년 ' + (day.getMonth() + 1) + '월';
		day.setMonth(day.getMonth() + 1);
	}
}
	

document.getElementById('members').addEventListener('dragstart', function(event){
	let target = event.target;
	if (target.className.includes('dr')){
		let index = ddElements.indexOf(target);
		if (index === -1){
			ddElements.push(target);
			index = ddElements.length - 1;
		}
		event.dataTransfer.setData('index', index);
	}
});

tableBody.addEventListener('dragstart', function(event){
	let target = event.target;
	if (target.className.includes('tableCell')){
		let index = ddElements.indexOf(target);
		if (index === -1){
			ddElements.push(target);
			index = ddElements.length - 1;
		}
		event.dataTransfer.setData('index', index);
	}
});
tableBody.addEventListener('dragover', function(event){
	event.preventDefault();
});
tableBody.addEventListener('drop', function(event){
	event.preventDefault();
	let target = event.target;
	if (target.className.includes('tableCell')){
		let origin = ddElements[event.dataTransfer.getData('index')];
		let originCName = origin.className;
		if (originCName.includes('dr')){
			let originID = originCName.split(' ')[1];
			for(let i = 1; i < target.childNodes.length; i++){
				if (target.childNodes[i].className.includes(originID)){
					return
				}
			}
			let copy = origin.cloneNode(true);
			copy.removeAttribute('draggable');
			copy.className = 'drInCell ' + originID;
			target.appendChild(copy);
		}else if(originCName.includes('tableCell')){
				if (target === origin){
					return
				}
				updateDutyHours(target, false);
				target.innerHTML = target.firstChild.textContent;
				removeClassAll('selected');
				for(let i = 1; i < origin.childNodes.length; i++){
					target.appendChild(origin.childNodes[i].cloneNode(true));
				}
				updateDutyHours(target, true);
				updateOutputByMonth(target.childNodes[0].textContent.split('/')[0]);
		}
	}
});
tableBody.addEventListener('click', function(event){
	let target = event.target;
	if (target.className.includes('tableCell') || target.className.includes('drInCell')){
		removeClassAll('selected');
		event.target.classList.add('selected');
	}
});

tableBody.addEventListener('dblclick', function(event){
	let target = event.target;
	let className = target.className;
	if (className.includes('drInCell')){
		promptWorkHour(target);
	}else if (className.includes('workHour')){
		promptWorkHour(target.parentNode);
	}
});
	
function promptWorkHour(target){
	let name = target.firstChild.textContent;
	let day = target.parentNode.firstChild.textContent;
	updateDutyHours(target.parentNode, false);
	let workHours = parseFloat(window.prompt(name + '님의 ' + day + '일 근무시간을 입력해주세요.'));
	if ((workHours > 0) && (workHours <= 24)){
		if (Number.isSafeInteger(workHours)){
			workHours = Math.floor(workHours);
		}else{
			workHours = workHours.toFixed(1);
		}
		if (target.childNodes[1]){
			target.childNodes[1].innerHTML = ': ' + workHours;
		}else{
			let text = document.createElement('span');
			text.className = 'workHour';
			text.innerHTML = ': ' + workHours;
			target.appendChild(text);
		}
	}
	updateDutyHours(target.parentNode, true);
	updateOutputByMonth(day.split('/')[0]);	
}

document.body.addEventListener('keydown', function(event){
	if (event.keyCode === 46){
		let target = event.target;
		if ((target.tagName !== 'INPUT') && (target.tagName !== 'BUTTON')){
			let selected = document.querySelector('.selected');
			if (selected === null){
				return
			}
			if (selected.className.includes('tableCell')){
				updateDutyHours(selected, false);
				selected.innerHTML = selected.firstChild.textContent;
				updateOutputByMonth(selected.childNodes[0].textContent.split('/')[0]);
			}else if (selected.className.includes('drInCell')){
				let parent = selected.parentNode;
				updateDutyHours(parent, false);
				parent.removeChild(selected);
				updateDutyHours(parent, true);
				updateOutputByMonth(parent.childNodes[0].textContent.split('/')[0]);
			}
		}
	}
});
function removeClassAll(className){
	let elements = document.querySelectorAll('.' + className);
	for(let i = 0; i < elements.length; i++){
			elements[i].classList.remove(className);
	}
}

function getCell(row, col){
	if ((row > 53) || (col > 7)){
		return
	}
	return tableBody.childNodes[row-1].childNodes[col-1];
}

function resetCalendar(){
	removeClassAll('selected');
	for(let r = 1; r < 54; r++){
		for(let i = 1; i < 8 ; i++){
			let cell = getCell(r, i);
			cell.innerHTML = cell.firstChild.textContent;
		}
	}
	for(let i = 1; i < 7; i++){
		dutyObj['dr' + i].reset();
	}
	updateOutput();
}

function fillCalendar(){
	removeClassAll('selected');
	let firstDataRow = 0;
	let firstEmptyRow = 0;
	for(let r = 1; r < 54; r++){
		for(let i = 1; i < 8 ; i++){
			let cell = getCell(r, i);
			if (cell.childNodes.length > 1){
				firstDataRow = r;
				break;
			}
		}
		if (firstDataRow){
			break;
		}
	}
	if (firstDataRow){
		for(let r = firstDataRow + 1; r < 54 ; r++){
			let isEmpty = true;
			for(let i = 1; i < 8 ; i++){
				if (getCell(r, i).childNodes.length > 1){
					isEmpty = false;
					break;
				}
			}
			if (isEmpty){
				firstEmptyRow = r;
				break;
			}
		}
		if (firstEmptyRow === 0){
			return
		}else{
			let gap = firstEmptyRow - firstDataRow;
			for(let i = 0; i < 53; i ++){
				for(let i = 0; i < gap; i++){
					let targetRow = firstEmptyRow + i;
					if (targetRow > 53){
						return
					}
					copyRow(firstDataRow + i, targetRow);
				}
				firstEmptyRow = firstEmptyRow + gap;
			}
		}
	}
}
	
function copyRow(origin, target){
	if ((origin < 1) || (origin > 52)){
		return
	}
	if ((target < 2) || (target > 53)){
		return
	}
	for(let i = 1; i < 8; i++){
		let originCell = getCell(origin, i);
		let targetCell = getCell(target, i);
		updateDutyHours(targetCell, false);
		targetCell.innerHTML = targetCell.firstChild.textContent;
		for(let i = 1; i < originCell.childNodes.length; i++){
			targetCell.appendChild(originCell.childNodes[i].cloneNode(true));
		}
		updateDutyHours(targetCell, true);
		updateOutputByMonth(targetCell.childNodes[0].textContent.split('/')[0]);
	}
}

function updateDutyHours(cell, InOut){
	let child = cell.childNodes;
	let date = child[0].textContent;
	let month = date.split('/')[0];
	let todayMonth = new Date().getMonth() + 1;
	if ((tableBody.firstElementChild === cell.parentNode) && (month !== todayMonth.toString())){
		return
	}
	if ((tableBody.lastElementChild === cell.parentNode) && (month === todayMonth.toString())){
		return
	}
	for(let i = 1; i < child.length; i++){
		let dr = child[i].className.split(' ')[1];
		let grandChild = child[i].childNodes;
		if (grandChild.length === 2){
			workhour = parseFloat(grandChild[1].textContent.substring(2));
			if (cell.className.includes('colHoliday')){
				if (InOut){
					dutyObj[dr]['month' + month + '_holiday'] = dutyObj[dr]['month' + month + '_holiday'] + workhour;
				}else{
					dutyObj[dr]['month' + month + '_holiday'] = dutyObj[dr]['month' + month + '_holiday'] - workhour;
				}
			}else{
				if (InOut){
					dutyObj[dr]['month' + month] = dutyObj[dr]['month' + month] + workhour;
				}else{
					dutyObj[dr]['month' + month] = dutyObj[dr]['month' + month] - workhour;
				}
			}
		}
	}
}

function updateOutput(){
	for(let i = 1; i < 13; i++){
		updateOutputByMonth(i);
	}
}
function updateOutputByMonth(targetMonth){
	let currentMonth = parseInt(new Date().getMonth()) + 1;
	let targetMonthInt = parseInt(targetMonth);
	let nth = 0;
	if (currentMonth <= targetMonthInt){
		nth = targetMonthInt - currentMonth;
	}else{
		nth = 12 - currentMonth + targetMonthInt;
	}
	let target = document.getElementById('output').childNodes[nth];
	for(let i = 1; i < 7 ; i ++){
		let drQuery = 'dr' + i;
		if (document.querySelector('.dr.' + drQuery) !== null){
			let child = target.childNodes;
			let childDr = null;
			for (let i = 1; i < child.length; i++){
				if (child[i].className.includes(drQuery)){
					childDr = child[i];
					break;
				}
			}
			let workHours = dutyObj[drQuery]['month' + targetMonth] + dutyObj[drQuery]['month' + targetMonth + '_holiday'];
			childDr.innerHTML = dutyObj[drQuery].name + ':&nbsp;&nbsp;&nbsp;' + workHours + ' 시간';
		}
	}
}
	

function createObjDr(){
	this.name = "";
	this.img = "";
	this.month1 = 0;
	this.month1_holiday = 0;
	this.month2 = 0;
	this.month2_holiday = 0;
	this.month3 = 0;
	this.month3_holiday = 0;
	this.month4 = 0;
	this.month4_holiday = 0;
	this.month5 = 0;
	this.month5_holiday = 0;
	this.month6 = 0;
	this.month6_holiday = 0;
	this.month7 = 0;
	this.month7_holiday = 0;
	this.month8 = 0;
	this.month8_holiday = 0;
	this.month9 = 0;
	this.month9_holiday = 0;
	this.month10 = 0;
	this.month10_holiday = 0;
	this.month11 = 0;
	this.month11_holiday = 0;
	this.month12 = 0;
	this.month12_holiday = 0;
}
	
createObjDr.prototype.reset = function(){
	this.month1 = 0;
	this.month1_holiday = 0;
	this.month2 = 0;
	this.month2_holiday = 0;
	this.month3 = 0;
	this.month3_holiday = 0;
	this.month4 = 0;
	this.month4_holiday = 0;
	this.month5 = 0;
	this.month5_holiday = 0;
	this.month6 = 0;
	this.month6_holiday = 0;
	this.month7 = 0;
	this.month7_holiday = 0;
	this.month8 = 0;
	this.month8_holiday = 0;
	this.month9 = 0;
	this.month9_holiday = 0;
	this.month10 = 0;
	this.month10_holiday = 0;
	this.month11 = 0;
	this.month11_holiday = 0;
	this.month12 = 0;
	this.month12_holiday = 0;
}
initCalendar();
initOutput();
