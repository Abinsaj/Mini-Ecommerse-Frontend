# 🛍️ Mini-Ecommerce Frontend

This is the **Frontend** of the Mini-Ecommerce application built using **React.js**, **Redux Toolkit**, and **Axios**. It communicates with the backend to support user registration, login, product listing, cart functionality, and order checkout.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abinsaj/Mini-Ecommerce-Frontend.git
cd Mini-Ecommerce-Frontend
```

### 2. Install Dependencies

npm install

### 3. Run the App

npm run dev


#### Folder Structure

Frontend/
├── .env                 # Environment variables
├── .gitignore
├── public/
├── src/
│   ├── App.jsx          # App root
│   ├── App.css
│   ├── index.css
│   ├── main.jsx         # Entry point
│   ├── assets/          # Images and static assets
│   ├── components/
│   │   ├── adminComponents/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   └── ProductList.jsx
│   │   ├── userComponents/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── Success.jsx
│   ├── config/
│   │   └── axiosInstance.js  # Axios base config
│   ├── redux/
│   │   ├── Slices/
│   │   │   ├── cartSlice.js
│   │   │   └── userSlice.js
│   │   └── store.js
│   ├── routes/
│   │   ├── adminRoutes.jsx
│   │   └── userRoute.jsx
│   └── services/
│       ├── AdminService/
│       │   ├── adminAxiosCall.js
│       │   ├── AdminLoggedOut.jsx
│       │   └── AdminLogin.jsx
│       └── UserService/
│           ├── userAxiosCall.js
│           ├── UserLogin.jsx
│           └── UserLogOut.jsx
├── vite.config.js       # Vite config
├── package.json
└── README.md

### ⚙️ Tech Stack

React.js
Redux Toolkit
Axios
Vite
React Router


🔄 Key Features

🧑 User & Admin Login
🛒 Add to Cart
✔️ Checkout & Order Flow
🧾 Admin Product Management (CRUD)
🔐 Protected Routes
Persistent Redux Store (LocalStorage)

⚠️ Notes

Ensure CORS is correctly configured in your backend.
The app assumes the backend runs on port 5678.
Clear Redux on user logout to prevent cart leakage between users.

👤 Author

Abinsaj