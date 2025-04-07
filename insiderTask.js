(function () {
  function createEl(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.text) el.textContent = options.text;
    if (options.html) el.innerHTML = options.html;
    if (options.style) Object.assign(el.style, options.style);
    return el;
  }

  const productTitle = document
    .querySelector(".product-single__title")
    ?.textContent.trim();
  const price = document
    .querySelector("#ProductPrice-product-template")
    ?.textContent.trim();
  const size = document.querySelector("#SingleOptionSelector-0")?.value;
  const color = document.querySelector("#SingleOptionSelector-1")?.value;
  const quantity = document.querySelector("#Quantity.js-qty__input")?.value;

  const imgEl = document.querySelector(".product-single__photo img");
  let productImage = "";

  if (imgEl) {
    const rawSrc = imgEl.getAttribute("src") || imgEl.getAttribute("data-src");
    productImage = rawSrc.startsWith("http") ? rawSrc : `https:${rawSrc}`;
  }

  if (!productTitle || !price) {
    alert(
      "Product information not found",
    );
    return;
  }
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .sticky-popup {
      animation: fadeUp 0.5s ease-out;
    }
    .sticky-popup img {
      max-width: 100%;
      border-radius: 6px;
      margin-bottom: 10px;
    }
  `;
  document.head.appendChild(style);

  const popup = createEl("div", {
    className: "sticky-popup",
    style: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#fff",
      padding: "16px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      zIndex: "9999",
      width: "300px",
      fontFamily: "Arial, sans-serif",
    },
  });

  popup.innerHTML = `
    <h2 style="
      margin-top: 0; 
      font-size: 18px; 
      border-bottom: 1px solid #666; 
      padding-bottom: 5px">
      ${productTitle}
    </h2>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Size:</strong> ${size}</p>
    <p><strong>Color:</strong> ${color}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <button id="custom-add-to-cart" style="
      background: #006eff;
      color: #fff;
      border: none;
      padding: 10px 15px;
      margin-top: 10px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
    ">Add to Cart</button>
  `;

  document.body.appendChild(popup);

  document
    .getElementById("custom-add-to-cart")
    .addEventListener("click", () => {
      const realAddToCartBtn = document.querySelector(
        "#AddToCart-product-template",
      );

      realAddToCartBtn.click();

      setTimeout(() => {
        
        const cartCount = quantity;

        popup.innerHTML = `
          <h2 style="margin-top: 0; 
          font-size: 18px; 
          border-bottom: 1px solid #666; 
          padding-bottom: 5px;">
          Just added to your cart</h2>
          <div style="display: flex; 
          justify-content: space-around; 
          align-items: center;">
          <div style="display: flex; 
          align-items: center;">
          ${productImage ? `<img src="${productImage}" alt="${productTitle}" 
            style="width: 75px; 
            height: auto; 
            border-radius: 5px;" />` : ""}
          <p><strong>${productTitle}</strong></p>
          </div>
          <p>Qty: ${quantity}</p>
          </div>
          <button id="view-cart-btn" style="
            background: #FFF;
            color: black;
            border: 1px solid black;
            padding: 10px 15px;
            margin-top: 10px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
          "><strong>VIEW CART (${cartCount})</strong></button>
        `;

        document
          .getElementById("view-cart-btn")
          .addEventListener("click", () => {
            window.location.href = "/cart";
          });
      }, 500);
    });
})();
