"use client";

import ErrorComponent from "@/app/_components/ErrorComponent";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <html>
      <body>
        <ErrorComponent
          title="Error"
          message="Something went wrong"
          onGoBack={handleGoBack}
          onHome={handleHome}
        />
      </body>
    </html>
  );
}
