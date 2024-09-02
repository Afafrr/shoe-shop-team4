import AuthPage from "@/components/AuthPage/AuthPage";
import AuthFooter from "@/components/AuthPage/AuthFooter";
import SignupCard from "./_components/SignupCard";
import SignupForm from "./_components/SignupForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  const footer = () => (
    <AuthFooter
      text="Already have an account?"
      anchor="Log in"
      href="../auth/sign-in"
    />
  );
  const SignupProps = {
    image: {
      src: "/auth/shoes-register.png",
      alt: "shoe-image-register",
      layout: "fill",
    },
    header: "Create an account",
    subheader: "Create an account to get an easy access to your dream shopping",
    Footer: footer,
    CardModal: SignupCard,
  };
  return (
    <AuthPage {...SignupProps}>
      <SignupForm />
    </AuthPage>
  );
}
