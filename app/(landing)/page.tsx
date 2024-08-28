import { Button } from "@/components/ui/button"; // Assuming Button is a custom component
import Link from "next/link"; // Correct Link import from Next.js

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page (UNPROTECTED)</h1>
      <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
