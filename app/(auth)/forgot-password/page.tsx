import AuthPage from "@/components/AuthPage/AuthPage";
import AuthFooter from "@/components/AuthPage/AuthFooter";
import RecoverForm from "./_components/RecoverForm";

export default function recover() {
  const footer = () => <AuthFooter anchor="Back to Log in" href="../sign-in" />;
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
