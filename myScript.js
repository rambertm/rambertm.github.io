let no = 1;

Document.getElementById('addDoctor').addEventListener('click', addDoctor);

function addDoctor(e){
  Document.getElementById('doctorList').insertAdjacentHTML('beforeend', 'Doctor' + no);
  no++
}
