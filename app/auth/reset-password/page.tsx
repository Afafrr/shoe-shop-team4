import AuthPage from "@/components/AuthPage/AuthPage";
import AuthFooter from "@/components/AuthPage/AuthFooter";
import ResetForm from "./_components/ResetForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export default async function resetPassword() {
  const session = await getServerSession(authOptions);
  const footer = () => (
    <AuthFooter anchor="Back to Log in" href="../auth/sign-in" />
  );
  const resetProps = {
    image: {
      src: "/auth/shoes-password-auth.png",
      alt: "shoe image",
      layout: "fill",
    },
    header: "Reset Password",
    subheader: "Please create new password here",
    Footer: footer,
  };
  return (
    <AuthPage {...resetProps}>
      <ResetForm />
    </AuthPage>
  );
}
