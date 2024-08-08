"use client";

import {Loader2, Search} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {Button} from "./ui/button";
import qs from "query-string";
import {Input} from "./ui/input";

function SearchBar() {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");

  const router = useRouter();

  const search = () => {
    if (!value) return;
    startTransition(() => {
      const url = qs.stringifyUrl(
        {
          url: "/search",
          query: {
            q: value,
          },
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      );

      router.push(url);
    });
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <form className="relative h-10 rounded-md">
        <Input
          disabled={isPending}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="absolute inset-0 h-full"
        />

        <Button
          disabled={isPending}
          size="sm"
          onClick={search}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
        >
          {isPending ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Search className="size-6" />
          )}
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
