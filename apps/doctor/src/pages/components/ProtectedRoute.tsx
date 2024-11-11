import { useAppSelector } from "@/redux/store/store";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import LoginPage from "../login";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Render children if authenticated
  return isAuthenticated ? <>{children}</> : <LoginPage />;
};

export default ProtectedRoute;
