import Link from "next/link";

export default async function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold">next.js perf</h1>

      <div className="mt-10">
        <ul className="list-disc font-semibold text-cyan-500">
          <li>
            <Link href="/users" className="underline">
              users page; server component; get a list of users with prisma ORM from postgres db
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
