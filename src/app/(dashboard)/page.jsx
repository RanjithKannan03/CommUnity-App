import React from "react";
import { faker } from '@faker-js/faker';
import HomePosts from "@/components/HomePosts";

export default async function Home() {
  faker.seed(123);

  return (
    <div className="flex justify-center flex-1 py-4">

      <div className="flex flex-col items-center w-full h-[calc(100vh-5rem)]">

        <div className="flex flex-col w-full py-4">

          <HomePosts />

        </div>

      </div>



    </div>
  );
}
