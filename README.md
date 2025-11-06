# 🧩 Frontend Developer (Angular)

## Screenshot:
<img width="1900" height="860" alt="image" src="https://github.com/user-attachments/assets/e430e1b7-1c78-4263-93e0-420106529f56" />

Filters:
<img width="1898" height="869" alt="image" src="https://github.com/user-attachments/assets/c5232158-e602-4585-b5d0-78ae7768eb2d" />

<img width="1899" height="862" alt="image" src="https://github.com/user-attachments/assets/57a01b56-97b4-42d8-8d96-5ab646af02b0" />


User Profile Pop-Up:
<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/709d8e6b-71b0-406f-9133-5f79830b1701" />

User Profile By URL:
<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/a62a2a9b-4e7d-4263-8544-19f60e2176e9" />
<img width="1918" height="450" alt="image" src="https://github.com/user-attachments/assets/43ea4f4a-1c59-41b8-9009-85566946a1cb" />




Dark Mode:
<img width="1900" height="864" alt="image" src="https://github.com/user-attachments/assets/e7842d4b-3c6e-4dda-866e-0984e4e54a95" />
<img width="1900" height="862" alt="image" src="https://github.com/user-attachments/assets/2cd509e7-b9f5-4a68-a91a-f3812bed6b61" />




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
