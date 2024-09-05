"use client";

import ErrorComponent from "@/app/_components/ErrorComponent";
import { useRouter } from "next/navigation";

type ErrorProps = {
  title?: string;
  message?: string;
};

export default function ErrorFound({
  title = "Error",
  message = "Something went wrong",
}: ErrorProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <ErrorComponent
      title={title}
      message={message}
      onGoBack={handleGoBack}
      onHome={handleHome}
    />
  );
}
