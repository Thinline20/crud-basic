import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default () => {
  const onSubmit = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const res = await fetch("/api/auth/login", {
        body: formData,
        method: "POST",
      });

      if (res.status !== 200) {
        console.error(res.statusText);
        alert(await res.text());
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      action="/api/auth/login"
      class="mt-8"
      id="login-form"
      method="post"
      onSubmit={(e) => onSubmit(e)}
    >
      <div class="flex flex-col gap-4">
        <div>
          <Label for="id">Id</Label>
          <Input id="id" name="id" required />
        </div>
        <div>
          <Label for="password">Password</Label>
          <Input id="password" name="password" required type="password" />
        </div>
        <div class="mt-4 flex justify-end">
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  );
};
