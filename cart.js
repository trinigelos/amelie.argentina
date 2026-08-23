// Carrito en memoria (no usa localStorage, se reinicia al recargar la página)
let cart = {};

function waLink(message){
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function addToCart(id, name, price, btn){
  if(!cart[id]) cart[id] = { name, price, qty: 0 };
  cart[id].qty += 1;
  renderCart();
  if(btn){
    btn.classList.add('added');
    btn.textContent = STRINGS.added;
    setTimeout(()=>{ btn.classList.remove('added'); btn.textContent = STRINGS.addBtn; }, 900);
  }
}

function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id].qty += delta;
  if(cart[id].qty <= 0) delete cart[id];
  renderCart();
}

function clearCart(){
  cart = {};
  document.getElementById('cart-name').value = '';
  document.getElementById('cart-date').value = '';
  document.getElementById('cart-mode').value = 'retiro_re';
  document.getElementById('cart-address').value = '';
  document.getElementById('cart-message').value = '';
  document.getElementById('cart-email').value = '';
  renderCart();
}

function cartCount(){
  return Object.values(cart).reduce((sum, it)=> sum + it.qty, 0);
}
function cartTotal(){
  return Object.values(cart).reduce((sum, it)=> sum + it.qty * it.price, 0);
}
function money(n){
  return `€${n.toFixed(2).replace('.00','')}`;
}

function updateDateMin(){
  // Sin restricción de días mínimos: el cliente elige libremente cualquier fecha.
}

function renderCart(){
  const count = cartCount();
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-fab').style.display = count > 0 ? 'flex' : 'none';
  document.getElementById('cart-form-wrap').style.display = count > 0 ? 'flex' : 'none';

  const listEl = document.getElementById('cart-items-list');
  const entries = Object.entries(cart);

  if(entries.length === 0){
    listEl.innerHTML = `<div class="cart-empty">${STRINGS.empty}</div>`;
  } else {
    listEl.innerHTML = entries.map(([id, it])=> `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${it.name}</div>
          <div class="cart-item-price">€${it.price} × ${it.qty} = ${money(it.price*it.qty)}</div>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty('${id}', -1)" aria-label="menos">−</button>
          <span class="qty-num">${it.qty}</span>
          <button onclick="changeQty('${id}', 1)" aria-label="mas">+</button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('cart-total').textContent = money(cartTotal());
  document.getElementById('cart-send').disabled = entries.length === 0;
  updateDateMin();
}

function openCart(){
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-panel').classList.add('open');
}
function closeCart(){
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-panel').classList.remove('open');
}

function formatDate(dateStr){
  if(!dateStr) return '';
  const [y,m,d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function buildOrderMessage(info){
  const entries = Object.values(cart);
  let msg = STRINGS.waIntro + "\n\n";
  entries.forEach(it=>{
    msg += `• ${it.qty}x ${it.name} — ${money(it.price*it.qty)}\n`;
  });
  msg += `\n${STRINGS.waTotal}: ${money(cartTotal())}`;
  msg += `\n\n${STRINGS.waClient}: ${info.name}`;
  msg += `\n${STRINGS.waDate}: ${formatDate(info.date)}`;
  const modeLabels = {
    'retiro_re': STRINGS.modeRetiroRE,
    'retiro_pr': STRINGS.modeRetiroPR,
    'envio': STRINGS.modeEnvio
  };
  msg += `\n${STRINGS.waModeLabel}: ${modeLabels[info.mode] || info.mode}`;
  if(info.address) msg += `\n${STRINGS.waAddress}: ${info.address}`;
  if(info.message) msg += `\n${STRINGS.waMessage}: ${info.message}`;
  return msg;
}

async function sendOrderEmail(info){
  if(!CONFIG.formspreeEndpoint || CONFIG.formspreeEndpoint.includes('XXXX')) return;
  if(!info.email) return;
  try{
    const entries = Object.values(cart);
    const itemsText = entries.map(it=> `${it.qty}x ${it.name} (${money(it.price*it.qty)})`).join(', ');
    const modeLabels = {
      'retiro_re': STRINGS.modeRetiroRE,
      'retiro_pr': STRINGS.modeRetiroPR,
      'envio': STRINGS.modeEnvio
    };
    await fetch(CONFIG.formspreeEndpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: info.name,
        email: info.email,
        fecha: info.date,
        modalidad: modeLabels[info.mode] || info.mode,
        direccion: info.address,
        mensaje: info.message,
        pedido: itemsText,
        total: money(cartTotal())
      })
    });
  }catch(e){
    console.error('No se pudo guardar el email', e);
  }
}

function showFieldErrorPopup(missing){
  document.getElementById('field-error-title').textContent = STRINGS.errorPopupTitle;
  document.getElementById('field-error-intro').textContent = STRINGS.errorPopupIntro;
  document.getElementById('field-error-list').innerHTML = missing.map(m => `<li>${m}</li>`).join('');
  document.getElementById('field-error-overlay-2').classList.add('open');
  document.getElementById('field-error-modal').classList.add('open');
}
function closeFieldErrorPopup(){
  document.getElementById('field-error-overlay-2').classList.remove('open');
  document.getElementById('field-error-modal').classList.remove('open');
}

function submitOrder(){
  const name = document.getElementById('cart-name').value.trim();
  const date = document.getElementById('cart-date').value;

  const missing = [];
  if(!name) missing.push(STRINGS.errorNombre);
  if(!date) missing.push(STRINGS.errorFecha);

  if(missing.length > 0){
    showFieldErrorPopup(missing);
    return;
  }

  const info = {
    name, date,
    mode: document.getElementById('cart-mode').value,
    address: document.getElementById('cart-address').value.trim(),
    message: document.getElementById('cart-message').value.trim(),
    email: document.getElementById('cart-email').value.trim()
  };

  const msg = buildOrderMessage(info);
  sendOrderEmail(info);
  window.open(waLink(msg), '_blank');
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('ig-link').href = CONFIG.instagramUrl;
  document.getElementById('ig-link-footer').href = CONFIG.instagramUrl;
  document.getElementById('wa-link-top').href = waLink(STRINGS.waGeneric);
  document.getElementById('wa-link-footer').href = waLink(STRINGS.waGeneric);
  document.getElementById('wa-link-match').href = waLink(STRINGS.waMatch);

  document.querySelectorAll('[data-add]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      addToCart(btn.dataset.id, btn.dataset.name, parseFloat(btn.dataset.price), btn);
    });
  });

  document.querySelectorAll('[data-wa-stock]').forEach(link=>{
    link.href = waLink(link.dataset.stockMsg);
  });

  document.getElementById('cart-fab').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('cart-send').addEventListener('click', submitOrder);
  document.getElementById('cart-clear').addEventListener('click', clearCart);
  document.getElementById('field-error-close').addEventListener('click', closeFieldErrorPopup);
  document.getElementById('field-error-overlay-2').addEventListener('click', closeFieldErrorPopup);

  renderCart();

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.2 });
  document.querySelectorAll('.pcard, .flourish').forEach(el=> io.observe(el));
});
