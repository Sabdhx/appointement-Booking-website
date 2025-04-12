"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  submitting: (formData: FormData) => void;
};

function Form({ submitting }: Props) {

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submitting(formData);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your credentials to sign in</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">username</Label>
            <Input
              id="email"
              name="username"
              type="text"
              required
              placeholder="Enter your username"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full">
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;