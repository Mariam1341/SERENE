const API_URL = "https://joqrzhlhgqrjghdljaxo.supabase.co/rest/v1/products";
const API_KEY = "sb_publishable_ehQ924QfRiIaAcaOcGPGDw_SHrIHuFx";
const Autherization = `Bearer ${API_KEY}`;

const headers = {
  apikey: API_KEY,
  Authorization: Autherization,
  "Content-Type": "application/json",
};

async function getAllProducts() {
  try {
    let result = await fetch(API_URL, {
      headers: headers,
    });
    let data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in getProducts:", error);
  }
}
getAllProducts();
async function getBestSellersProducts() {
  try {
    let data = [];
    let result = await fetch(API_URL, {
      headers: headers,
    });
    let products = await result.json();
    products.forEach((p) => {
      if (p.is_best_seller) {
        data.push(p);
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in getBestSellersProducts:", error);
  }
}
getBestSellersProducts();

async function addOrEditProduct(product, id) {
  try {
    if (id) {
      await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(product),
      });
    } else {
      await fetch(`${API_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(product),
      });
      showProducts();
    }
  } catch (error) {
    console.log("Error in addOrEditProduct:", error);
  }
}

async function deleteProduct(id) {
  if (confirm("Are you sure?")) {
    await fetch(`${API_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers,
    });
    showProducts();
  }
}

async function showProducts(products, containerId) {
  const container = document.getElementById(containerId);
  const bestSellerHTML =` <span class="badge position-absolute top-0 start-0 m-2 px-3 py-2"
                      style="background-color: #1a5d1a; font-size: 0.7rem; border-radius: 0; z-index: 2;">
                      BEST SELLER
                </span>`;

  container.innerHTML = "";

  products.forEach((p) => {
    p.is_best_seller? bestSellerBadge = bestSellerHTML : bestSellerBadge = "";
    const productHTML = `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="card border-0 h-100 position-relative">
               
                ${bestSellerBadge}
                <div class="bg-light mb-3 img-container">
                  <img src="${p.main_image}" class="img-fluid main-img" style="object-fit: cover" alt="${p.name}" />
                  <img src="${p.hover_image || p.main_image}" class="hover-img" alt="${p.name} Back">
                </div>
                
                <div class="card-body p-0 text-center">
                  <h6 class="fw-bold mb-1" style="color: #ec238b; font-size: 1rem">
                    ${p.name}
                  </h6>
                  <p class="text-muted small mb-3">
                    ${p.short_description || "No description available"}
                  </p>

                  <button onclick="addToCart(${p.id})" class="btn btn-hover w-100 fw-bold py-2"
                          style="border-color: #eee; font-size: 0.8rem">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
        `;

    container.innerHTML += productHTML;
  });
}
async function initPage() {
    const data = await getBestSellersProducts();
    const allProducts = await getAllProducts();
    showProducts(data, "best-sellers-container");
    showProducts(allProducts, "all-products");
}initPage();