import Link from "next/link";
import React from "react";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { UserButton } from "@/features/auth/components/user-button";

import { Button } from "../ui/button";
import { SearchBar } from "./search-bar";

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky left-0 top-0 z-10 w-full bg-background px-5 py-3 shadow-sm">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          Conexão Empreendedora
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <SearchBar />
              <UserButton user={user} />
            </>
          ) : (
            <Button asChild>
              <Link href="/auth/login">
                <span>Fazer Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
