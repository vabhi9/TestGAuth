import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VisibilityProvider } from "./utils/Visibilitycontext.jsx";
// import Sign from "./Signin.jsx/Sign.jsx";
import ProductLayout from "./ProductLayout/ProductLayout.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrolltoTop.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Blog from "./Blog/Blog.jsx";
import Refund from "./Policy/Refund.jsx";
import Privacy from "./Policy/Privacy.jsx";
import TermsCons from "./Policy/TermsCons.jsx";
import ProDesc from "./ProductLayout/ProductDescription/ProDesc.jsx";
import { CartProvider } from "./Cart/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import ToastWrapper from "./utils/ToastWrapper.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Sin from "./Signin/Sin.jsx";
import Welcome from "./utils/Verified.jsx";
import AuthCallback from "./Signin/AuthCallback.jsx";
// import Welcome from "./Signin.jsx/Welcome.jsx";
// import AuthHandler from "./Signin.jsx/AuthHandler.jsx";

// Layout Component to Wrap Routes with ScrollToTop
const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const Routes = createBrowserRouter([
  {
    element: <Layout />, // Wrap all routes inside Layout to apply ScrollToTop globally
    children: [
      { path: "/signin", element: <Sin /> },
      { path: "/Home", element: <App /> },
      { path: "/callback", element: <AuthCallback /> },
      // { path: "/user/:username", element: <App /> },
      { path: "/", element: <App /> },
      {
        path: "/api/product/:category",
        element: (
          <VisibilityProvider>
            <Navbar />
            <ProductLayout />
          </VisibilityProvider>
        ),
      },
      {
        path: "/api/blog",
        element: (
          <VisibilityProvider>
            <Navbar />
            <Blog />
          </VisibilityProvider>
        ),
      },
      { path: "/return&refundpolicies", element: <Refund /> },
      { path: "/&&privacypolicy", element: <Privacy /> },
      { path: "/terms&&conditions", element: <TermsCons /> },
      { path: "/welcome", element: <Welcome /> },
      // { path: "/verifiedSuccessfully", element: <VerifiedSuccessfully /> },
      // { path: "/welcome", element: <Welcome /> },
      // { path: "/__/auth/handler", element: <AuthHandler /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <ToastWrapper />
      <Auth0Provider
        domain="dev-byqjfgrjkisp6l10.us.auth0.com"
        clientId="r8vh0PThAwqxcRo3RLFkuNh4tJwVBLd1"
        authorizationParams={{
          redirect_uri: `${window.location.origin}/callback`,
        }}
        onRedirectCallback={(appState) => {
          window.history.replaceState(
            {},
            document.title,
            appState?.returnTo || window.location.pathname
          );
        }}
      >
        <RouterProvider router={Routes} />
      </Auth0Provider>
    </CartProvider>
  </StrictMode>
);
