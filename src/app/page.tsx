import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/components/create-post";
import { ModeToggle } from "~/components/ModelToggle";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex h-[900px]  flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

      <div className="text-5xl font-extrabold tracking-tight sm:text-[5rem] ">

        <ModeToggle />
      </div>

      <div className="flex flex-col items-center gap-2 pb-0">
        <p className="text-2xl text-white">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
      </div>

      <CrudShowcase />

    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
