let selectedVeg = null;

// Farmer selects vegetable
function selectVeg(name, type, image, basePrice) {
  selectedVeg = { name, type, image, basePrice };

  vegName.innerText = name;
  vegType.innerText = "Type: " + type;
  suggestedPrice.innerText = "Suggested price: ₹" + basePrice + "/kg";
  price.value = basePrice;
}

// Add to market
function addToMarket() {
  let market = JSON.parse(localStorage.getItem("marketItems")) || [];

  market.push({
    ...selectedVeg,
    price: price.value,
    qty: quantity.value,
    delivery: deliveryDate.value
  });

  localStorage.setItem("marketItems", JSON.stringify(market));
  alert("Item added to market");
}

// Restaurant market
if (document.getElementById("products")) {
  let market = JSON.parse(localStorage.getItem("marketItems")) || [];
  let html = "";

  market.forEach((i, index) => {
    html += `
      <div class="item-card">
        <img src="${i.image}">
        <h4>${i.name}</h4>
        <p>₹${i.price}/kg</p>
        <p>Available: ${i.qty} kg</p>
        <p>Delivery: ${i.delivery}</p>
        <button onclick="placeOrder(${index})">Order</button>
      </div>
    `;
  });

  products.innerHTML = html;
}

// Place order
function placeOrder(i) {
  let market = JSON.parse(localStorage.getItem("marketItems"));
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    ...market[i],
    status: "Confirmed",
    payment: "UPI / Cash"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Order confirmed");
}

// Orders page
if (document.getElementById("orders")) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let html = "";

  orders.forEach(o => {
    html += `
      <div class="item-card">
        <h4>${o.name}</h4>
        <p>₹${o.price}/kg</p>
        <p>Status: ${o.status}</p>
        <p>Payment: ${o.payment}</p>
      </div>
    `;
  });

  orders.innerHTML = html;
}

// Chatbot
function sendChat() {
  let q = chatInput.value.toLowerCase();
  let market = JSON.parse(localStorage.getItem("marketItems")) || [];
  let reply = "Ask about price, availability or delivery";

  if (q.includes("price")) {
    reply = market.map(i => `${i.name}: ₹${i.price}/kg`).join("<br>");
  } else if (q.includes("available")) {
    reply = market.map(i => `${i.name}: ${i.qty} kg`).join("<br>");
  } else if (q.includes("delivery")) {
    reply = "Delivery within selected dates by farmers";
  }

  chatArea.innerHTML += `<p><b>You:</b> ${q}</p>`;
  chatArea.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
  chatInput.value = "";
}
// HOME PAGE DASHBOARD DATA
if (
  document.getElementById("itemCount") &&
  document.getElementById("marketPreview")
) {
  let market = JSON.parse(localStorage.getItem("marketItems")) || [];
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Stats
  document.getElementById("itemCount").innerText = market.length;
  document.getElementById("orderCount").innerText = orders.length;

  let totalQty = 0;
  market.forEach(i => totalQty += parseInt(i.qty));
  document.getElementById("totalQty").innerText = totalQty;

  // Market Preview
  let html = "";
  market.forEach(item => {
    html += `
      <div class="item-card">
        <img src="${item.image}">
        <p><b>${item.name}</b></p>
        <p>${item.qty} kg</p>
      </div>
    `;
  });

  document.getElementById("marketPreview").innerHTML =
    html || "<p>No items added yet</p>";
}
function sendMessage() {
  let input = document.getElementById("chatInput");
  let box = document.getElementById("chatBox");

  let msg = input.value.toLowerCase();
  if (!msg) return;

  box.innerHTML += `<p class="user">${input.value}</p>`;

  let reply = "Sorry, I didn't understand.";

  if (msg.includes("price")) reply = "Prices are shown per kg in the market.";
  else if (msg.includes("item")) reply = "Available items are listed in Market Preview.";
  else if (msg.includes("order")) reply = "You can see order details in the dashboard.";

  box.innerHTML += `<p class="bot">${reply}</p>`;
  input.value = "";
}
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");
}
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";
}

