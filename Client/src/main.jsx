import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Header_Footer/Footer.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import { PrimeReactProvider } from "primereact/api";
import { BlogProvider } from "./Context/blogsContext.jsx";
import Nav from "./Components/Header_Footer/Nav.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider value={{ unstyled: true }}>
        <BlogProvider>
          <AuthProvider>
            <div className=" bg-black relative text-white min-h-screen w-full overflow-x-hidden">
              <Nav />
              <App />
              <Footer />
            </div>
          </AuthProvider>
        </BlogProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
