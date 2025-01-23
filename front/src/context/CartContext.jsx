import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const { token } = useContext(UserContext);

  const addToCart = (pizza) => {
    console.log("pizza addToCart", pizza);
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === pizza.id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart[index].count++;
        return newCart;
      } else {
        return [...prevCart, { ...pizza, count: 1 }];
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, pizza) => total + pizza.price * pizza.count,
    0
  );

  const getQuantity = () =>
    cart.reduce((total, pizza) => total + pizza.count, 0);
  const cartCheckout = async () => {
    const response = await fetch("http://localhost:5001/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: cart,
      }),
    });

    let data = await response.json();
    console.log("dataCart", data);
    if (data.message == "Checkout successful") {
      setCart([]);
      // alert("Pago exitoso😎🎉🍕🛒!");
      setCheckoutSuccess(true);
    } else {
      setCheckoutSuccess(false);
      alert(data?.error || data.message);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        totalPrice,
        getQuantity,
        cartCheckout,
        checkoutSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
