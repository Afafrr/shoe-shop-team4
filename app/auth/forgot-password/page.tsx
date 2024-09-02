import AuthPage from "@/components/AuthPage/AuthPage";
import AuthFooter from "@/components/AuthPage/AuthFooter";
import RecoverForm from "./_components/RecoverForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function recover() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  const footer = () => (
    <AuthFooter anchor="Back to Log in" href="../auth/sign-in" />
  );
  const recoverProps = {
    image: {
      src: "/auth/shoes-password-auth.png",
      alt: "shoe image",
      layout: "fill",
    },
    header: "Forgot Password?",
    subheader: "Don’t worry, we’ll send you reset instructions.",
    Footer: footer,
  };
  return (
    <AuthPage {...recoverProps}>
      <RecoverForm />
    </AuthPage>
  );
}
