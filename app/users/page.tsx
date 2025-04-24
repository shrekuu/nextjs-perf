import prisma from "@/lib/prisma";

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { page = "1", sort = "asc", limit = "10" } = await searchParams;

  const parsedPage = Array.isArray(page) ? parseInt(page[0]) : parseInt(page);
  const parsedLimit = Array.isArray(limit) ? parseInt(limit[0]) : parseInt(limit);

  // Validate parsedPage and parsedLimit to ensure they are positive integers
  const validPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const validLimit = isNaN(parsedLimit) || parsedLimit < 1 ? 10 : parsedLimit;

  const validSort = sort === "asc" || sort === "desc" ? sort : "asc";

  // get first 10 users
  const users = await prisma.user.findMany({
    skip: (validPage - 1) * validLimit,
    take: validLimit,
    orderBy: {
      name: validSort,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">users page; server component; get a list of users with prisma ORM from postgres db</h1>
      <div>
        <p>Current page: {validPage}</p>
        <p>Sort order: {validSort}</p>
      </div>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
