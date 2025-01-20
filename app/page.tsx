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
      <Card>
        <CardHeader>
          <CardTitle>Sign-In</CardTitle>
          <CardDescription>
            SIgn-in or sign-up to get started with your To-Do list!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-around items-center">
          <Button asChild>
            <SignInButton />
          </Button>
          <Button variant={"secondary"} asChild>
            <SignUpButton />
          </Button>
          <Button variant={"destructive"} asChild>
            <SignOutButton />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
