"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductCardType, ProductContextItem } from "@/types/Product";

export type RecentlyViewedCard = ProductContextItem & {
  viewedAt: number;
};

type RecentlyViewedContextType = {
  getRecentItems: () => RecentlyViewedCard[];
  addItem: (item: ProductCardType) => void;
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

  // Updates local storage every time a new item is added to recently viewed.
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(recentlyViewedItems)
    );
  }, [recentlyViewedItems]);

  /**
   * Adds an item to the recentlyViewedItems, updating the quantity if the item already exists.
   *
   * @param {ProductCardType} item - The item to add to the recentlyViewedItems.
   * @return {void}
   */
  const LENGTH_LIMIT = 15;
  const addItem = (item: ProductCardType): void => {
    // Create Id for context list.
    const newItemId = `${item.productId}`;
    // Create timestamp.
    const viewed = new Date().getTime();
    // Update state list.
    setRecentlyViewedItems((prevItems) => {
      const isFull = (list: RecentlyViewedCard[]) =>
        list.length === LENGTH_LIMIT;
      // If product is already in list, it should be deleted before adding it at the beginning
      const new_list = prevItems.filter((item) => item.id !== newItemId);
      // If list limit is reached, delete the oldest item.
      if (isFull(new_list)) new_list.pop();
      return [{ id: newItemId, viewedAt: viewed, ...item }, ...new_list];
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
