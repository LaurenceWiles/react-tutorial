import { signInWithGoogle } from "../../utitlities/Firebase";


export const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signInWithGoogle()}>
      Sign In
    </button>
  );