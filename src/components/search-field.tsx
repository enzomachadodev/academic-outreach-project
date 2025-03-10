"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Input } from "./ui/input";

interface SearchFieldProps {
  containerStyle?: string;
  inputStyle?: string;
  placeholder?: string;
}

export const SearchField = ({
  containerStyle,
  inputStyle,
  placeholder = "Search...",
}: SearchFieldProps) => {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.q as HTMLInputElement;
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className={cn("relative", containerStyle)}>
        <Input
          name="q"
          placeholder={placeholder}
          className={cn("pe-10 shadow-none", inputStyle)}
        />
        <SearchIcon className="absolute right-4 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
};
