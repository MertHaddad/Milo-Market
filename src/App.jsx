import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./routes/home";
import Product from "./routes/product";
import Checkout from "./routes/checkout";
import Contact from "./routes/contact";
import Store from "./routes/store";
import useScrollDetector from "./assets/hooks/useScrollDetector";
import BasketPage from "./routes/basketPage";
import Navbar from "./components/main/navbar";
import Footer from "./components/main/footer";
import UpButton from "./components/main/upButton";
import MobileNavigation from "./components/main/mobileNavigation";
import PopupBasket from "./components/basket/popupBasket";
export default function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <PopupBasket />
        <Outlet />
        <UpButton />
        <MobileNavigation />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/store",
          element: <Store />,
        },
        {
          path: "/product/:slug",
          element: <Product />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/basket",
          element: <BasketPage />,
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ]);

  useScrollDetector();
  return <RouterProvider router={router} />;
}
