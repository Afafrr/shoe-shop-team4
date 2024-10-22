"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

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

/**
 * A React context provider for managing wishlist items.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the WishlistProvider.
 * @return {JSX.Element} The WishlistContext.Provider component with the wishlist items and related functions.
 */
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storageKey, setStorageKey] = useState<string>("");
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { data: session, status } = useSession();

  // Sets local storage key based on userId
  // Will update storage key if user changes
  useEffect(() => {
    if (status !== "authenticated") return;
    const new_key = `wishlist_${session.user.id}`;
    setStorageKey(new_key);
  }, [session]);

  // Retrieves the users saved Wishlist Items.
  // If user changes, it updates WishlistItems list to represent the new localStorage values.
  useEffect(() => {
    const savedWishlist = localStorage.getItem(storageKey);
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    setWishlistItems(wishlist);
  }, [storageKey]);

  // Updates local storage every time a new item is added to Wishlist.
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
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
