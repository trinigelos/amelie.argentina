document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('nav-menu-btn');
  const panel = document.getElementById('nav-menu-panel');
  if(!btn || !panel) return;

  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  document.addEventListener('click', (e)=>{
    if(!panel.contains(e.target) && e.target !== btn){
      panel.classList.remove('open');
    }
  });
});
