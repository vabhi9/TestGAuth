import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import { useCart } from "./CartContext";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  return (
    <div>
      <FaCartArrowDown
        className="h-8 w-8 text-yellow-500"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div
          className="h-auto w-72 bg-red-200 absolute right-3 flex flex-col items-center py-2 rounded-2xl gap-2"
          onMouseLeave={() => setOpen(false)}
        >
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                className="h-24 w-[95%] bg-slate-600 rounded-2xl"
                key={index}
              >
                <span>{item.productName}</span>
                <span>₹{item.price}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
