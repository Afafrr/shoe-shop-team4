"use client";

import { createContext, ReactNode, useContext } from "react";
import { UserData } from "@/types/types";
import { ResData } from "@/utils/getData";
const UserDataContext = createContext<ResData<UserData> | undefined>(undefined);

export const UserDataProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: ResData<UserData> | undefined;
}) => {
  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserInfoProvider");
  }
  return context;
};
