import { UserButton } from "@clerk/nextjs";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <header className="self-end mr-4 mt-4">
        <UserButton />
      </header>
      {children}
    </div>
  );
}
