"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export type NewWishlistItem = {
  productId: number;
  name: string;
  gender: string;
  imageUrl: string;
  price: number;
};

export type WishlistItem = NewWishlistItem & {
  id: string;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addItem: (item: NewWishlistItem) => void;
  removeItem: (id: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "wishlist";

/**
 * A React context provider for managing wishlist items.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the WishlistProvider.
 * @return {JSX.Element} The WishlistContext.Provider component with the wishlist items and related functions.
 */
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Updates local storage every time a new item is added to Wishlist.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  /**
   * Adds an item to the wishlist, updating the quantity if the item already exists.
   *
   * @param {WishlistItem} item - The item to add to the wishlist.
   * @return {void}
   */
  const addItem = (item: NewWishlistItem): void => {
    const newItemId = `${item.productId}`;
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === newItemId);

      if (existingItem) {
        return prevItems;
      }

      return [...prevItems, { id: newItemId, ...item }];
    });
  };

  /**
   * Removes an item from the wishlist based on the provided ID.
   *
   * @param {number} id - The ID of the item to be removed.
   * @return {void}
   */
  const removeItem = (id: string): void => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addItem,
        removeItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/**
 * Retrieves the cart context.
 *
 * @return {WishlistContextType} The cart context.
 */
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
};
