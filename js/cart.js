let cart=JSON.parse(localStorage.getItem("cart")) || [];


function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
}

    
function getCartCount(){
    return cart.reduce((sum,item) => sum+item.qty,0);
}

function getProductById(id){
    if(typeof ProductsCart ==="undefined") return null;
    return ProductsCart.find((p)=>p.id==id) || null;
}

function getSubtotal(){
    return cart.reduce((sum,item) => {
        let p=getProductById(item.id);
        let price=p ? Number(p.price) || 0:0;
        return sum + price * item.qty;
    },0);
}

function showCart() {
  showBadge();
  showEmptyState();
  showCartItems();
  showSubtotal();
}

function showBadge() {
  let badge = document.getElementById("cartCount");
  if (badge) badge.textContent = getCartCount();
}

function showSubtotal() {
  let el = document.getElementById("sidebarSubtotal");
  if (el) el.textContent = `${getSubtotal()} LE`;
}

function showEmptyState() {
  let empty = document.getElementById("emptyCart");
  let list = document.getElementById("cartList");
  if (!empty || !list) return;

  let isEmpty = cart.length === 0;
  empty.classList.toggle("d-none", !isEmpty);
  list.classList.toggle("d-none", isEmpty);
}

function showCartItems() {
  const list = document.getElementById("cartList");
  const tpl = document.getElementById("cartItemlist");
  if (!list || !tpl) return;

  list.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const p = getProductById(item.id);

    const name = p ? p.name : `Product #${item.id}`;
    const img = p ? p.main_image : "";
    const price = p ? Number(p.price) || 0 : 0;
    const total = price * item.qty;

    const node = tpl.content.cloneNode(true);

    const imgEl = node.querySelector(".cart-item-image");
    if (img) {
      imgEl.src = img;
      imgEl.alt = name;
    } else {
      imgEl.remove();
    }

    node.querySelector(".cart-item-name").textContent = name;
    node.querySelector(".cart-item-price").textContent = `${price} LE`;
    node.querySelector(".cart-item-qty").textContent = item.qty;
    node.querySelector(".cart-item-total").textContent = `${total} LE`;

    node.querySelector(".cart-item-remove").onclick = () => removeFromCart(item.id);
    node.querySelector(".cart-item-inc").onclick = () => increaseQty(item.id);
    node.querySelector(".cart-item-dec").onclick = () => decreaseQty(item.id);

    list.appendChild(node);
  }
}

function addToCart(id) {
  id = Number(id);

  let found = cart.find((item) => item.id === id);

  if (found) found.qty += 1;
  else cart.push({ id: id, qty: 1 });

  saveCart();
  showCart();
}

function removeFromCart(id) {
  id = Number(id);
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  showCart();
}

function increaseQty(id) {
  addToCart(id);
}

function decreaseQty(id) {
  id = Number(id);

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty -= 1;

      if (cart[i].qty <= 0) cart.splice(i, 1);

      saveCart();
      showCart();
      return;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showCart();
  setTimeout(showCart, 1000);
});