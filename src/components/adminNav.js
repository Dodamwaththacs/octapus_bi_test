"use client";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GlobalNav() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (session?.user?.refreshToken) {
      try {
        await fetch(
          "https://auth.chamika31.me/realms/octapusBi/protocol/openid-connect/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: "orderManagementApp",
              client_secret: "0Lni4iKzf4RkYvz2APzb9k4Q4ovyo7fu",
              refresh_token: session.user.refreshToken,
            }),
          }
        );
      } catch (error) {
        console.error("Failed to logout from Keycloak", error);
      }
    }

    await signOut({ redirect: false });
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 px-4 py-3" aria-label="Main navigation">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/admin"
          className="text-white text-lg font-semibold hover:text-gray-200 transition-colors"
        >
          Admin Dashboard
        </Link>

        <div className="flex items-center space-x-6">
          <div>
            <Link
              href="/admin/orders"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Orders
            </Link>
          </div>
          <div>
            <Link
              href="/admin/manageProducts"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Manage Products
            </Link>
          </div>
          
          <div>
            {session ? (
              <div className="text-white ">
              <p>Welcome, {session?.user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => signIn("keycloak", { callbackUrl: "/redirect" })}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
