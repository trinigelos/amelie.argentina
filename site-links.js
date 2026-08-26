document.addEventListener('DOMContentLoaded', ()=>{
  const igLink = document.getElementById('ig-link');
  const igLinkFooter = document.getElementById('ig-link-footer');
  const waLinkTop = document.getElementById('wa-link-top');
  const waLinkFooter = document.getElementById('wa-link-footer');
  const waLinkMain = document.getElementById('wa-link-main');

  const msg = (typeof STRINGS !== 'undefined' && STRINGS.waGeneric) ? STRINGS.waGeneric : 'Hola!';
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  if(igLink) igLink.href = CONFIG.instagramUrl;
  if(igLinkFooter) igLinkFooter.href = CONFIG.instagramUrl;
  if(waLinkTop) waLinkTop.href = waUrl;
  if(waLinkFooter) waLinkFooter.href = waUrl;
  if(waLinkMain) waLinkMain.href = waUrl;
});
