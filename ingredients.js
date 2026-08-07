// Modal de ingredientes — se abre al hacer click en el botón "i" de cada producto
function openIngModal(title, text){
  document.getElementById('ing-title').textContent = title;
  document.getElementById('ing-text').textContent = text;
  document.getElementById('ing-overlay').classList.add('open');
  document.getElementById('ing-modal').classList.add('open');
}
function closeIngModal(){
  document.getElementById('ing-overlay').classList.remove('open');
  document.getElementById('ing-modal').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.info-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      openIngModal(btn.dataset.ingTitle, btn.dataset.ingText);
    });
  });
  document.getElementById('ing-overlay').addEventListener('click', closeIngModal);
  document.getElementById('ing-close').addEventListener('click', closeIngModal);
});
