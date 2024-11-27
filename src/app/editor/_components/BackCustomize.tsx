"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../../components/ui/button";
import { observer } from "mobx-react";

export const BackCustomize = observer(() => {
  const router = useRouter();
  const pathname= usePathname();
  return (
    <div className="flex flex-row w-full bg-[#000] py-3 px-2">
      <div className="justify-start  m-1 flex flex-row items-center">
        <Button
          onClick={() => router.back()}
          className="bg-[#CCCCCC]  text-black py-1 px-4  rounded-md"
        >
          Back
        </Button>
      </div>
      <div className="flex flex-row  items-center justify-center w-full">
        <h1 className="item-center justify-center text-center text-xl text-[#CCCCCC] ">
          {pathname==="/editor" ? "Create Your Animation": "Customize Your Animation"}
        </h1>
      </div>
    </div>
  );
});