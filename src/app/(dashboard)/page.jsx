import Post from "@/components/Post";
import React from "react";
import { faker } from '@faker-js/faker';

export default function Home() {
  faker.seed(123);
  const posts = [
    {
      communityName: faker.company.name(),
      communityURL: faker.image.avatar(),
      time: faker.date.anytime(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
    },
    {
      communityName: faker.company.name(),
      communityURL: faker.image.avatar(),
      time: faker.date.anytime(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      attachment: faker.image.url()
    },
    {
      communityName: faker.company.name(),
      communityURL: faker.image.avatar(),
      time: faker.date.anytime(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
    },
    {
      communityName: faker.company.name(),
      communityURL: faker.image.avatar(),
      time: faker.date.anytime(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      attachment: faker.image.url()
    },
    {
      communityName: faker.company.name(),
      communityURL: faker.image.avatar(),
      time: faker.date.anytime(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
    },
    {
      communityName: faker.company.name(),
      communityURL: faker.image.avatar(),
      time: faker.date.anytime(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      attachment: faker.image.url()
    },
  ]
  return (
    <div className="flex justify-center flex-1 py-4">

      <div className="flex flex-col items-center flex-1 w-full overflow-y-auto">

        <div className="flex w-full">
          <div className="flex flex-col items-center w-full h-full gap-6">


            {
              posts.map((post) => {
                return (
                  <Post communityName={post.communityName} communityURL={post.communityURL} time={post.time} title={post.title} text={post.text} attachment={post.attachment} />
                )
              })
            }

          </div>
        </div>

      </div>



    </div>
  );
}
