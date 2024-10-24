"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

export type NewCartItem = {
  productId: number;
  quantity: number;
  name: string;
  gender: string;
  image: string;
  price: number;
  color: string;
  size: number;
};

export type CartItem = NewCartItem & {
  id: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: NewCartItem) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  totalPrice: () => CartTotals;
};

type CartTotals = {
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * A React context provider for managing cart items.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the CartProvider.
 * @return {JSX.Element} The CartContext.Provider component with the cart items and related functions.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storageKey, setStorageKey] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: session, status } = useSession();

  // Sets local storage key based on userId
  // Will update storage key if user changes
  useEffect(() => {
    if (status !== "authenticated") return;
    const new_key = `cart_${session.user.id}`;
    setStorageKey(new_key);
  }, [session]);

  // Retrieves the users saved Cart.
  // If user changes, it updates Cart to represent the new localStorage values.
  useEffect(() => {
    const savedCart = localStorage.getItem(storageKey);
    const cart = savedCart ? JSON.parse(savedCart) : [];
    setCartItems(cart);
  }, [storageKey]);

  // Updates local storage every time a new item is added to Cart.
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
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
  const addItem = (item: NewCartItem): void => {
    const newItemId = `${item.productId}-${item.size}`;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === newItemId);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === newItemId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevItems, { id: newItemId, ...item }];
    });
  };

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {number} id - The ID of the item to update.
   * @param {number} quantity - The new quantity of the item.
   * @return {void}
   */
  const updateItemQuantity = (id: string, quantity: number): void => {
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
  const removeItem = (id: string): void => {
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

  /**
   * Calculates price value of cart.
   * @returns {CartTotals}
   */
  const totalPrice = (): CartTotals => {
    const subtotal = cartItems.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);
    const freeShippingAmount = 200;
    const shippingCost = 20;
    const taxRate = 0.08;

    const shipping = subtotal > freeShippingAmount ? 0 : shippingCost;
    const tax = (subtotal + shipping) * taxRate;
    const total = subtotal + shipping + tax;

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
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
        totalPrice,
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
