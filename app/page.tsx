import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/todo");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Sign-In</CardTitle>
          <CardDescription>
            Sign-in or sign-up to get started with your To-Do list!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-around items-center">
          <Button className="w-full my-3" asChild>
            <SignInButton />
          </Button>
          <Button className="w-full my-3" variant={"secondary"} asChild>
            <SignUpButton />
          </Button>
          <Button className="w-full my-3" variant={"destructive"} asChild>
            <SignOutButton />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
