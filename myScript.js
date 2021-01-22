let drNo = 1;
document.getElementById('addDoctor').addEventListener('click', addDoctor);
function addDoctor(e){
  let child = document.createElement('span');
  child.id = 'doctor' + drNo;
  let childContent = document.createTextNode('doctor' + drNo);
  document.getElementById('doctorList').appendChild(child);
  child.appendChild(childContent);
    
  drNo++;
}
