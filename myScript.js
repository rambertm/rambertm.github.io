let no = 1;
let button = document.getElementById('addDoctor');
button.addEventListener('click', addDoctor);

function addDoctor(e){
  document.getElementById('doctorList').insertAdjacentHTML('beforeend', 'Doctor' + no);
  no++;
}
