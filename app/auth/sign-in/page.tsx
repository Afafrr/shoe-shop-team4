import AuthPage from "@/components/AuthPage/AuthPage";
import AuthFooter from "@/components/AuthPage/AuthFooter";
import SigninForm from "./_components/SigninForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  const footer = () => (
    <AuthFooter
      text="Don’t have an account?"
      anchor="Sign up"
      href="../auth/sign-up"
    />
  );
  const SignInProps = {
    image: {
      src: "/auth/shoes-log-in.png",
      alt: "shoe-image-register",
      layout: "fill",
    },
    header: "Welcome back!",
    subheader:
      "Welcome back! Please enter your details to log into your account.",
    Footer: footer,
  };
  return (
    <AuthPage {...SignInProps}>
      <SigninForm />
    </AuthPage>
  );
}
