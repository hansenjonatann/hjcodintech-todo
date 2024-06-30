import { SignIn } from "@clerk/nextjs";
const SignInPage = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-zinc-700">
      <SignIn />
    </div>
  );
};

export default SignInPage;
