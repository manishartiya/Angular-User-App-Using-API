# 🧩 Frontend Developer (Angular) - Practical Assignment

## 📘 Objective
This project demonstrates key Angular concepts and best practices, including:
- Routing  
- API Integration  
- Dynamic Component Loading  
- Structural & Attribute Directives  
- Popup / Modal Interaction  

### Built with Angular: 17.3.12 version (compatible with Angular ≥ 14).

## ⚙️ Features Implemented

### 1. **Routing**
- `/users` → Displays a list of users.  
- `/user/:id` → Shows individual user details.  
- `/about` → page for navigation testing.  

### 2. **API Integration**
- Data fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com).  
- API Endpoints:
  - `GET /users` → Fetch user list  
  - `GET /users/{id}` → Fetch specific user details  
- Includes **loading** and **error handling** states.

### 3. **Popup / Modal**
- Clicking **“View Details”** opens a modal showing detailed user info.  
- Implemented using **Angular Material Dialog** (can also be custom).  
- Includes **Close** button functionality.

### 4. **Dynamic Component Loading**
- `UserCardComponent` – Displays user list cards dynamically.  
- `UserDetailsComponent` – Renders details component dynamically using `ViewContainerRef` or `*ngComponentOutlet`.

### 5. **Directives Usage**
- `*ngIf` – For conditionally showing loaders and errors.  
- `*ngFor` – For looping through users.  
- Dynamic styles and conditional highlights (e.g., active user, hover effects).  

### 6. **Bonus Features (Optional)**
- Search bar to filter users by name.  
- Responsive layout for mobile view.  
- Sorting by username or email.

### Starting the App

> ng serve (if it is not working the use below)
> npx ng serve --port 4300 --open=false