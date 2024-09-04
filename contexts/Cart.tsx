import React, { createContext, useState, useContext, useEffect } from "react";

import { Product } from "@/types/Product";

type CartItem = Product & {
  id: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "cart";

/**
 * A React context provider for managing cart items.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the CartProvider.
 * @return {JSX.Element} The CartContext.Provider component with the cart items and related functions.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Calculates the total number of items in the cart.
   *
   * @return {number} The total number of items in the cart.
   */
  const getCartItemCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Adds an item to the cart, updating the quantity if the item already exists.
   *
   * @param {CartItem} item - The item to add to the cart.
   * @return {void}
   */
  const addItem = (item: CartItem): void => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }

      return [...prevItems, item];
    });
  };

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {number} id - The ID of the item to update.
   * @param {number} quantity - The new quantity of the item.
   * @return {void}
   */
  const updateItemQuantity = (id: number, quantity: number): void => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  /**
   * Removes an item from the cart based on the provided ID.
   *
   * @param {number} id - The ID of the item to be removed.
   * @return {void}
   */
  const removeItem = (id: number): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /**
   * Clears the cart by setting the cart items to an empty array.
   *
   * @return {void} This function does not return anything.
   */
  const clearCart = (): void => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getCartItemCount,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Retrieves the cart context.
 *
 * @return {CartContextType} The cart context.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
