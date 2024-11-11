import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { PostRequestHandler, SetLocalStorageItems } from "@/utils/utils";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/authSlice";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  var router = useRouter();
  var dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    var loginUser = await PostRequestHandler("/user/auth/login", formData);
    var current_user = loginUser.user;
    console.log(current_user);
    if (loginUser.token) {
      SetLocalStorageItems("authorization", loginUser.token);
      dispatch(
        setUser({
          isAuthenticated: true,
          user: current_user,
        })
      );
      router.push("/dashboard")
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Text */}
      <div className="flex flex-col justify-center w-1/2 p-8 text-white bg-[black] min-h-screen h-full">
        <h2 className="text-4xl font-bold mb-4 text-[80px]">Welcome Back!</h2>
        <p className="text-[24px] mt-8">
          Sign in to continue to your account and enjoy exclusive features and
          content.
        </p>
        <p className="text-[20px] mt-[10px]">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline text-white">
            Sign up here
          </Link>
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-col justify-center h-full w-1/2 p-8 bg-white min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
