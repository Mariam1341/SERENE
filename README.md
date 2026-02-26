# SERENE Project

This is our final group project. It is an E-commerce website for a beauty and skincare brands called "SERENE". We focused on making the design clean, elegant, and very easy for the user to navigate.

## Main Features

* **Home Page:** Introduction to the brand with featured categories and best-selling products.
* **Shop Page:** A full catalog where users can:
  * Search for products by name.
  * Filter products by Category (Face, Hair, Body, Lips.).
  * Sort products by price (Low to High or High to Low).
* **Product Page:** Shows a single product with details and allows adding it to the cart.
* **About Us Page:** Brand story and key features.
* **Contact Us Page:** Contact/support page for user inquiries.
* **Login & Register Pages:** User authentication UI (login + create account).
* **Privacy Policy & Terms Pages:** Website policies and terms.
* **Admin Dashboard:** A private area for us to manage the store. We can:
  * **Add** new products.
  * **Edit** existing product details (price, name, images, etc).
  * **Delete** products from the inventory.
* **Shopping Cart (Offcanvas Sidebar):** Users can add products to their cart, update quantities, remove items, and see the subtotal.

## Tools & Technologies

* **HTML5:** To build the structure of all pages.
* **CSS:** For custom styling and colors.
* **Bootstrap 5:** To make the website responsive.
* **Bootstrap Icons:** For icons used across the UI.
* **Vanilla JavaScript:** To handle all the logic like filtering, searching, cart management, authentication UI, and the Admin Dashboard.
* **Fetch API:** To connect our website to the server to get and update product data.
* **LocalStorage:** To store cart items and persist the cart between pages, and to save user data for the local **login/register** flow (basic client-side authentication).

## Pages

* `home.html` - Main landing page + best sellers.
* `shop.html` - Products catalog + search/filter/sort.
* `product.html` - Single product details page.
* `checkout.html` - Checkout page.
* `login.html` - Login page.
* `register.html` - Register page.
* `about us.html` - About the brand page.
* `contact us.html` - Contact/support page.
* `privacy policy.html` - Privacy policy page.
* `terms and conditions.html` - Terms & conditions page.
* `adminDashboard.html` - Admin CRUD dashboard for products.

## Project Structure

* HTML Pages:
  * `home.html`, `shop.html`, `product.html`, `checkout.html`, `login.html`, `register.html`,
    `about us.html`, `contact us.html`, `privacy policy.html`, `terms and conditions.html`,
    `adminDashboard.html`

* `js/` - JavaScript logic files:
  * `products.js` - Fetch products + render pages (home/shop/product) + filtering logic.
  * `cart.js` - Cart logic (LocalStorage, badge counter, sidebar rendering, subtotal).
  * `login.js` - Login validation/logic.
  * `register.js` - Registration validation/logic.
  * `admin.js` - Admin dashboard add/edit/delete logic.

* `css/`
  * `style.css` 

* Assets:
  * `images/` - Shared images/assets
  * `pics/` - Additional images/assets

---

**Developed by:**
* Salma Nader
* Mariam Mohammed