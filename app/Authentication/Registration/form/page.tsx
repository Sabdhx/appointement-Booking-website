import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { registration } from "@/action/user";



function Form() {
  const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    registration(formData);
  }
  return (
    <div className="w-full max-w-md">
      <form 
        onSubmit={handleFormData}
        className="rounded-lg border bg-white p-8 shadow-sm"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Create Account</h2>

        <div className="mb-6 space-y-2">
          <Label className="text-sm font-medium">Account Type</Label>
          <RadioGroup 
            defaultValue="normalUser" 
            name="role" 
            className="flex gap-4"
            required
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="provider" id="provider" />
              <Label htmlFor="provider">Service Provider</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normalUser" id="normalUser" />
              <Label htmlFor="normalUser">Normal User</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="username"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password (min 6 characters)"
              minLength={6}
            />
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Form;
