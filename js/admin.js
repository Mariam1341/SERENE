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

async function getProducts() {
  try {
    const res = await fetch(API_URL, { headers });
    const data = await res.json();

    const table = document.getElementById("productsTable");

    const tableHTML = data.map((product) => {
      return `
        <tr>
          <td><small class="text-muted">#${product.id}</small></td>
          <td>
            <div class="d-flex align-items-center">
              <img src="${product.main_image}" class="table-img me-2" style="width:40px; height:40px; object-fit:cover;">
              <span class="fw-bold">${product.name}</span>
            </div>
          </td>
          <td><span class="badge bg-light text-dark border">${product.category}</span></td>
          <td class="fw-bold text-pink" style="color:#ec238b">${product.price} EGP</td>
          <td>${product.brand}</td>
    
              
<td class="text-center">
   <button class="btn btn-warning btn-sm"style ="background-color: #fff; border: 1px solid #ec238b;" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn btn-danger btn-sm" style ="background-color: #ec238b;;"onclick="deleteProduct(${product.id})">Delete</button>
  
  </div>
</td>

          
        </tr>`;
    });

    table.innerHTML = tableHTML.join("");
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

async function AddOrEditProduct(form, e) {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const productData = {
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    category: document.getElementById("category").value,
    brand: document.getElementById("brand").value,
    short_description: document.getElementById("short_description").value,
    main_image: document.getElementById("main_img").value,
    hover_image: document.getElementById("hover_img").value,
  };

  try {
    if (id) {
      await fetch(`${API_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(productData),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(productData),
      });
    }

    form.reset();
    document.getElementById("productId").value = "";
    getProducts();
    alert(id ? "Product updated successfully!" : "Product added successfully!");
  } catch (error) {
    console.log("Error saving product:", error);
  }
}

async function getSingleProduct(id) {
  try {
    let result = await fetch(`${API_URL}?id=eq.${id}`, {
      headers: headers,
    });
    return (data = await result.json());
  } catch (error) {
    console.log("Error in getProduct : ", error);
  }
}
async function editProduct(id) {
  document.getElementById("productId").value = id;
  let reponse = await getSingleProduct(id);
  let product = reponse[0];
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;
  document.getElementById("brand").value = product.brand;
  document.getElementById("short_description").value =
    product.short_description;
  document.getElementById("description").value = product.description;
  document.getElementById("main_img").value = product.main_image;
  document.getElementById("hover_img").value = product.hover_image;
}

async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await fetch(`${API_URL}?id=eq.${id}`, {
        method: "DELETE",
        headers,
      });
      getProducts();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  }
}

getProducts();
