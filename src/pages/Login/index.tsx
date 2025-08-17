import { auth } from "@/apis";
import { Logo, Textfield } from "@/components";
import { rules } from "@/constants";
import { Layout } from "@/layouts";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Form } from "react-form-rules";
import toast from "react-hot-toast";
import { Button, Card, Stack, Typography } from "reaxify/components";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSetData = (key: keyof typeof data) => {
    // eslint-disable-next-line
    return (value: any) => {
      setData((p) => ({ ...p, [key]: value }));
    };
  };
  const { mutate, isPending } = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      toast.success("success");
    },
  });
  const submit = () => {
    mutate(data);
  };
  return (
    <Layout>
      <Layout.Body className="w-full min-h-screen flex p-4 lg:p-6">
        <Card as={Form} onSubmit={submit} className="max-w-sm m-auto">
          <Card.Header className="space-y-4">
            <Stack className="items-center gap-4">
              <Logo className="h-10" />
              <Stack variant="vertical" className="flex-1">
                <Typography
                  variant="heading-5"
                  className="flex-1 text-gray-700"
                >
                  Sign in
                </Typography>
                <Typography className="text-gray-500">
                  Sign in with your email address
                </Typography>
              </Stack>
            </Stack>
          </Card.Header>
          <Card.Body className="space-y-4">
            <Textfield
              label="Email"
              value={data.email}
              setValue={handleSetData("email")}
              rules={rules.email}
              type="email"
              autoFocus
            />
            <Textfield
              label="Password"
              value={data.password}
              setValue={handleSetData("password")}
              rules={rules.required}
              type="password"
            />
          </Card.Body>
          <Card.Footer>
            <Button type="submit" className="block w-full" loading={isPending}>
              Login
            </Button>
          </Card.Footer>
        </Card>
      </Layout.Body>
    </Layout>
  );
}
