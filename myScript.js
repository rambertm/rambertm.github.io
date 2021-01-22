let no = 1;

document.getElementById('addDoctor').addEventListener('click', addDoctor);

function addDoctor(e){
  document.getElementById('doctorList').insertAdjacentHTML('beforeend', 'Doctor' + no);
  no++
}
