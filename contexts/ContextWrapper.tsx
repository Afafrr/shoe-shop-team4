import dynamic from "next/dynamic";
import { UserDataProvider } from "@/contexts/UserDataProvider";
import { useSession } from "next-auth/react";
import { getData, ResData } from "@/utils/getData";
import { UserData } from "@/types/types";
import { useEffect, useState } from "react";

const DynamicCartProvider = dynamic(
  () => import("@/contexts/Cart").then((module) => module.CartProvider),
  {
    ssr: false,
  }
);

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<ResData<UserData> | undefined>({
    data: null,
    error: "",
  });
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session.status === "loading") return;
      if (!session.data) {
        setUserData({ data: null, error: "You are not logged in!" });
      }
      if (session.data) {
        const data: ResData<UserData> = await getData(
          "users/me?populate=avatar",
          session?.data?.user.jwt
        );
        setUserData(data);
      }
    };
    fetchData();
  }, [session]);

  return (
    <UserDataProvider data={userData}>
      <DynamicCartProvider>{children}</DynamicCartProvider>
    </UserDataProvider>
  );
}
