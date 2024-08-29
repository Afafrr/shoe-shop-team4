import AuthPage from "@/components/AuthPage/AuthPage";
import AuthFooter from "@/components/AuthPage/AuthFooter";
import SignupCard from "./_components/SignupCard";
import SignupForm from "./_components/SignupForm";

export default function SignUp() {
  const footer = () => (
    <AuthFooter
      text="Already have an account?"
      anchor="Log in"
      href="../sign-in"
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
