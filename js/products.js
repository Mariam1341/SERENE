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

async function getBestSellersProducts() {
  try {
    let result = await fetch(API_URL, {
      headers: headers,
    });
    let products = await result.json();

    // this is my first thoughts

    // products.forEach((p) => {
    //   if (p.is_best_seller) {
    //     data.push(p);
    //   }
    // });

    // this is my upgraded one :)
    let data = products.filter(p=> p.is_best_seller === true)
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in getBestSellersProducts:", error);
  }
}

// }
// async function productsPage() {
//     const params = new URLSearchParams(window.location.search);
//     const category =  params.get('cat');
//     // let header = ;
//     category? document.getElementById("products-header").innerText = category.toUpperCase():
//     document.getElementById("products-header").innerText = "ALL PRODUCTS";

//     let products = await getAllProducts();

//     let filteredProducts = [];
    
//   if (category) {
//       filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());  
//       showProducts(filteredProducts, "all-products");
//   }else{
//     showProducts(products, "all-products");
//   }

// }


  async function productsPage() {
    let params = new URLSearchParams(window.location.search);
    let categoryFromUrl = params.get('cat');
    
    let header = document.getElementById("products-header");
    if (categoryFromUrl) {
        header.innerText = categoryFromUrl.toUpperCase();
    } else {
        header.innerText = "ALL PRODUCTS";
    }

    let allProducts = await getAllProducts();
    
function Filtering() {
        let searchInput = document.getElementById("products-search").value.toLowerCase();
        let categorySelect = document.getElementById("catigories-filter").value;
        let priceSort = document.getElementById("products-sort").value;

        let filteredList = allProducts.filter(function(p) {
            let categoryToMatch;
            if (categorySelect === "all") {
                categoryToMatch = categoryFromUrl || "all";
            } else {
                categoryToMatch = categorySelect;
            }

            let matchCat = (categoryToMatch === "all" || p.category.toLowerCase() === categoryToMatch.toLowerCase());
            let matchSearch = p.name.toLowerCase().includes(searchInput);
            
            return matchCat && matchSearch;
        });

        if (priceSort === "low") {
            filteredList.sort(function(a, b) { return a.price - b.price; });
        } else if (priceSort === "high") {
            filteredList.sort(function(a, b) { return b.price - a.price; });
        }

        showProducts(filteredList, "all-products");
        
        let countText = document.querySelector(".results-count");
        if (countText) {
            countText.innerText = "Showing " + filteredList.length + " products";
        }
    }
    

    document.getElementById("apply-btn").onclick = Filtering;
    document.getElementById("products-search").oninput = Filtering;

    if (categoryFromUrl) {
        document.getElementById("catigories-filter").value = categoryFromUrl.toLowerCase();
    }

    Filtering();

}


function showProducts(products, containerId) {
  
  const container = document.getElementById(containerId);

  
  const bestSellerHTML =` <span class="badge position-absolute top-0 start-0 m-2 px-3 py-2"
                      style="background-color: #1a5d1a; font-size: 0.7rem; border-radius: 0; z-index: 2;">
                      BEST SELLER
                </span>`;


  let productsHTML = products.map(p=>{
    p.is_best_seller? bestSellerBadge = bestSellerHTML : bestSellerBadge = "";
    isSameImage = p.hover_image ? "" : "zoom-effect";
    return `
            <div class="col-6 col-md-4 col-lg-3" >
            <a href="/product.html?id=${p.id}">
              <div class="card border-0 h-100 position-relative " >
               
                ${bestSellerBadge}
                <div class="bg-light mb-3 img-container ${isSameImage}" style="text-doceration:none; ">
                  <img src="${p.main_image}" class="img-fluid main-img" style="object-fit: cover" alt="${p.name}" />
                  <img src="${p.hover_image || p.main_image}" class="hover-img" alt="${p.name} Back">
                </div>
                </a>
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
  });
  container.innerHTML =  productsHTML.join("");

  // container.innerHTML = "";

  // products.forEach((p) => {
  //   p.is_best_seller? bestSellerBadge = bestSellerHTML : bestSellerBadge = "";
  //   const productHTML = 

  //   container.innerHTML += productHTML;
  // });
}

async function getSingleProduct(id){

  try{
    let result = await fetch(`${API_URL}?id=eq.${id}`, {
      headers: headers,
    });
    return data = await result.json();
    
  }catch(error){
    console.log("Error in getProduct : ",error)
  }
}

function showSingleProduct(product,containerId){
  const container = document.getElementById(containerId);
  const bestSellerHTML =` <span class="badge position-absolute top-0 start-0 m-2 px-3 py-2"
                      style="background-color: #1a5d1a; font-size: 0.7rem; border-radius: 0; z-index: 2;">
                      BEST SELLER
                </span>`;
  const sympl = parseInt(product.price / 3);
  
  container.innerHTML = `
    <div class="row py-5 g-5">
      <div class="col-6">
        <img src="${product.main_image}" alt="${product.name}" class="img-fluid w-100 shadow-sm" />
      </div>

      <div class="col-6">     
        ${bestSellerHTML} 
        
        <h1 class="fw-bold mb-3">${product.name}</h1>
        
        <p class="text-muted mb-3">
          ${product.short_description}
        </p>

        <div class="border p-3 mb-4 bg-light">
          Pay over 3 payments of <span class="fw-bold text-danger">${sympl} EGP</span>
          with your bank card.<br>
          <strong>0 interest 0 registration</strong>
        </div>

        <div class="border p-3 mb-2 bg-light">
          <h6 class="fw-bold d-flex justify-content-between mb-0">DESCRIPTION</h6>
        </div>
        <div class="px-3 mb-4">
          <p class="text-muted">${product.description}</p>
        </div>

        <div class="row g-3 mb-4 align-items-center">
          <div class="d-flex align-items-center border" style="width: fit-content;">
  <button class="btn btn-sm px-3 py-2 border-end" onclick="changeQty(-1)" > - </button>
  
  <span id="product-qty" class="px-4 fw-bold">1</span>
  
  <button class="btn btn-sm px-3 py-2 border-start" onclick="changeQty(1)"> + </button>
</div>
          <div class="col-9">
            <button onclick="addToCart(${product.id})" class="btn btn-hover-product w-100 fw-bold py-2 text-white"
                style="background-color: #ec238b;">
              ADD TO CART - ${product.price} LE
            </button>
          </div>

          
      <div class="border  p-3 mb-4 mt-4" style=" border-color: #ddd !important;">
    <div class="d-flex align-items-center pb-2 border-bottom mb-3">
        <i class="bi bi-truck me-3 fs-4"></i>
        <p class=" small">Estimate delivery times: <strong>3-5 days.</strong></p>
    </div>
    <div class="d-flex align-items-center ">
        <i class="bi bi-box me-3 fs-4"></i>
        <p class="small">Free shipping & returns: <strong>On all orders over 2,000 EGP.</strong></p>
    </div>
    </div>

  

        </div>
      </div>

</div>
</div>


    </div>


  `;
}

async function initHomePage() {
    const data = await getBestSellersProducts();
    showProducts(data, "best-sellers-container");
  
}

async function initAllProductsPage() {
   const allProducts = await getAllProducts();
  showProducts(allProducts, "all-products");
}
 

async function initProductPage() {
   // I already know that the right way is to put the id in the url 
    // But I don't know how to access it in native javasript 
    // I know how in React but not in this 
    // so I ask chat GPT and this is the response (:

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');


    let data = await getSingleProduct(productId);
    //cause fetch return array
    showSingleProduct(data[0], "single-product");
}
 