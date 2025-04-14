import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { useVisibility } from "../utils/Visibilitycontext";

const checkBoxes = [
  { label: "100 - 499", min: 100, max: 499 },
  { label: "500 - 999", min: 500, max: 999 },
  { label: "1000 - 1499", min: 1000, max: 1499 },
  { label: "1500 - 1999", min: 1500, max: 1999 },
  { label: "2000 - 2499", min: 2000, max: 2499 },
  { label: "2500 - 2999", min: 2500, max: 2999 },
  { label: "3000 - 3499", min: 3000, max: 3499 },
];

const ProductLayout = () => {
  const { addToCart } = useCart();
  const [selectedCheck, setSelectedCheck] = useState(null);

  const handleCheckboxChange = (min, max) => {
    setSelectedCheck((prev) =>
      prev && prev.min === min && prev.max === max ? null : { min, max }
    );
  };

  // Code for Dynamically Fetch Data on the Basis of Different Categories
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  const filteredItems = products.filter(
    (item) =>
      !selectedCheck ||
      (item.price >= selectedCheck.min && item.price <= selectedCheck.max)
  );

  // const addToCart = (item) => {
  //   setCart((prevCart) => {
  //     const updatedCart = [...prevCart, item];
  //     console.log("Cart:", updatedCart);
  //     return updatedCart;
  //   });
  // };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/product/register/${category}`
      )
      .then((response) => {
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data); // Directly set the array of objects
        } else {
          console.warn("Unexpected response format, setting empty array");
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setProducts([]);
      });
  }, [category]);

  const { hideRedBox } = useVisibility();
  return (
    <>
      <div className="h-auto w-full bg-red-30 flex">
        <section
          className="bg-indigo-400 basis-[20%] flex justify-center place-items-start"
          id="S1"
        >
          {!hideRedBox && (
            <div
              className="sticky top-10 mt-10 min-h-[80vh] max-h-[80vh] w-[94%] rounded-2xl bg-red-300
            flex flex-col items-center justify-between py-10 z-10"
            >
              <h1 className="font-bold text-4xl">Price:</h1>
              <div className="flex flex-col text-2xl px-6 space-y-4 w-full">
                {checkBoxes.map(({ label, min, max }, index) => {
                  return (
                    <div key={index}>
                      <label className="space-y-6 bg-yello-500 w-full">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer"
                          checked={
                            selectedCheck &&
                            selectedCheck.min === min &&
                            selectedCheck.max === max
                          }
                          onChange={() => handleCheckboxChange(min, max)}
                        />
                        <span className="ml-3">{label}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
        <section
          className=" w-full flex justify-center items-center basis-[80%]"
          id="S2"
        >
          <div
            className="h-[97%] grid grid-cols-4 gap-y-3"
            style={{ flexBasis: "98%" }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((Product) => (
                <div
                  className="h-[26rem] bg-offWhite border-y-[1.4px] border-x-[1px] border-slate-600
                 flex justify-center items-start hover:-translate-y-2 duration-500 hover:rounded-3xl"
                  key={Product._id}
                  // key={index}
                >
                  <div
                    className="h-[90%] w-[95%] bg-slae-500 bg-yelow-400 justify-around px-1
                flex flex-col items-start hover: cursor-pointer rounded-xl
                "
                  >
                    <div
                      className="bg-Primary basis-[55%] w-full rounded-xl p-2"
                      id="img"
                    >
                      <p>{Product.image}</p>
                    </div>
                    <div className="">{Product.productName}</div>
                    <div className="">{Product.category}</div>
                    <p className="">{Product.price}</p>

                    {/* Add to Cart Button */}
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                      onClick={() => addToCart(Product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-spn-4 text-center text-lg">
                No products match the selected filters.
              </p>
            )}
          </div>
        </section>
      </div>
      {/* <Cart /> */}
    </>
  );
};

export default ProductLayout;
