"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductCard, ProductContextItem } from "@/types/Product";

type RecentlyViewedCard = ProductContextItem & {
  viewedAt: number;
};

type RecentlyViewedContextType = {
  getRecentItems: () => RecentlyViewedCard[];
  addItem: (item: ProductCard) => void;
  removeItem: (id: string) => void;
};

const RecentlyContext = createContext<RecentlyViewedContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "recent";

/**
 * A React context provider for managing recently-viewed items.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the RecentlyProvider.
 * @return {JSX.Element} The RecentlyContext.Provider component with the recently-viewed items and related functions.
 */
export const RecentlyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<
    RecentlyViewedCard[]
  >(() => {
    const savedRecentlyViewed = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedRecentlyViewed ? JSON.parse(savedRecentlyViewed) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(recentlyViewedItems)
    );
  }, [recentlyViewedItems]);

  /**
   * Adds an item to the recentlyViewedItems, updating the quantity if the item already exists.
   *
   * @param {ProductCard} item - The item to add to the recentlyViewedItems.
   * @return {void}
   */
  const addItem = (item: ProductCard): void => {
    // Create Id for context list.
    const newItemId = `${item.productId}`;
    // Create timestamp.
    const viewed = new Date().getTime();
    // Update state list.
    setRecentlyViewedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === newItemId);

      // Reject repeated items
      if (existingItem) {
        return prevItems;
      }

      return [...prevItems, { id: newItemId, viewedAt: viewed, ...item }];
    });
  };

  /**
   * Removes an item from the recentlyViewedItems based on the provided ID.
   *
   * @param {number} id - The ID of the item to be removed.
   * @return {void}
   */
  const removeItem = (id: string): void => {
    setRecentlyViewedItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const EXPIRY_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
  const filterItems = (): RecentlyViewedCard[] => {
    // Current time
    const time = new Date().getTime();
    // Filter all items that have passed the expire time.
    const new_list = recentlyViewedItems.filter(
      (item) => time < item.viewedAt + EXPIRY_TIME
    );
    // Avoid an unnecessary state update if no item was removed.
    if (new_list.length === recentlyViewedItems.length)
      return recentlyViewedItems;
    else {
      setRecentlyViewedItems(new_list);
      return new_list;
    }
  };

  const getRecentItems = (): RecentlyViewedCard[] => {
    return filterItems();
  };

  return (
    <RecentlyContext.Provider
      value={{
        getRecentItems,
        addItem,
        removeItem,
      }}
    >
      {children}
    </RecentlyContext.Provider>
  );
};

/**
 * Retrieves the Recently context.
 *
 * @return {RecentlyViewedContextType} The Recently context.
 */
export const useRecently = (): RecentlyViewedContextType => {
  const context = useContext(RecentlyContext);

  if (!context) {
    throw new Error("useRecently must be used within a RecentlyProvider");
  }

  return context;
};
