import { getServerAuthSession } from "@/server/auth";
import { ServerWrapper } from "@/components/ServerWrapper";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) {
    return (
      <div className="flex-col mx-20 bg-black">
        <ServerWrapper />
      </div>
    );
  } else {
    return <></>;
  }
}
