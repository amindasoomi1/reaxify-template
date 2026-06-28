import { auth } from "@/apis";
import { Icon, Logo, Textfield } from "@/components";
import { appConfig, rules } from "@/constants";
import { Layout } from "@/layouts";
import { IconName } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Form } from "react-form-rules";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Stack,
  Switch,
  Typography,
} from "reaxify/components";
import { cn } from "reaxify/helpers";

const features: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "Chart",
    title: "Real-time Analytics",
    description: "Track sales, orders, and revenue from a single dashboard.",
  },
  {
    icon: "Shield",
    title: "Secure by Default",
    description: "Enterprise-grade encryption keeps your data protected.",
  },
  {
    icon: "People",
    title: "Team Collaboration",
    description: "Invite your team and manage roles with ease.",
  },
];

const stats = [
  { label: "Active Users", value: "12K+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Countries", value: "48" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Store Owner",
    quote:
      "This platform transformed how we manage orders. Setup took less than 10 minutes.",
  },
  {
    name: "Michael Chen",
    role: "Operations Lead",
    quote:
      "The dashboard gives us everything we need at a glance. Highly recommended.",
  },
];

const socialProviders = [
  { label: "Google", icon: "Global" as IconName },
  { label: "Apple", icon: "Apple" as IconName },
  { label: "GitHub", icon: "Code" as IconName },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Login() {
  const { mutate, isPending } = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      toast.success("success");
    },
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleSetData = (key: keyof typeof data) => {
    // eslint-disable-next-line
    return (value: any) => {
      setData((p) => ({ ...p, [key]: value }));
    };
  };
  const submit = () => {
    mutate(data);
  };

  const testimonial = testimonials[activeTestimonial];

  return (
    <Layout>
      <Layout.Body className="min-h-svh w-full p-0 lg:grid lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-white lg:flex">
          <div className="pointer-events-none absolute -inset-e-24 -top-24 size-72 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -inset-s-16 size-56 rounded-full bg-white/5" />

          <Stack direction="column" className="relative z-[1] gap-8">
            <Logo className="h-9 brightness-0 invert" />
            <Stack direction="column" className="gap-3">
              <Typography variant="heading-3" className="text-white">
                Manage your business smarter
              </Typography>
              <Typography variant="body-1" className="max-w-md text-white/75">
                {appConfig.description}. Join thousands of teams already using{" "}
                {appConfig.title}.
              </Typography>
            </Stack>

            <Stack direction="column" className="gap-5">
              {features.map((feature) => (
                <Stack key={feature.title} className="items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon name={feature.icon} className="size-5 text-white" />
                  </div>
                  <Stack direction="column" className="gap-0.5">
                    <Typography
                      variant="body-1"
                      className="font-medium text-white"
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body-2" className="text-white/65">
                      {feature.description}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Stack direction="column" className="relative z-[1] gap-6">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <Typography variant="heading-5" className="text-white">
                    {stat.value}
                  </Typography>
                  <Typography variant="body-3" className="mt-1 text-white/60">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>

            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <Card.Body className="space-y-4 p-5">
                <Typography variant="body-2" className="italic text-white/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </Typography>
                <Stack className="items-center justify-between gap-4">
                  <Stack className="items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Fallback>
                        {getInitials(testimonial.name)}
                      </Avatar.Fallback>
                    </Avatar>
                    <Stack direction="column" className="gap-0">
                      <Typography
                        variant="body-2"
                        className="font-medium text-white"
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body-3" className="text-white/60">
                        {testimonial.role}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack className="gap-1.5">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Show testimonial ${index + 1}`}
                        onClick={() => setActiveTestimonial(index)}
                        className={cn(
                          "size-2 rounded-full transition-colors",
                          index === activeTestimonial
                            ? "bg-white"
                            : "bg-white/30 hover:bg-white/50",
                        )}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card.Body>
            </Card>

            <Stack className="items-center gap-3">
              <Typography variant="body-3" className="text-white/60">
                Trusted by teams at
              </Typography>
              <Avatar.Group>
                {["Acme", "Nova", "Pulse", "Orbit"].map((company) => (
                  <Avatar key={company} size="sm">
                    <Avatar.Fallback>
                      {company[0].toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                ))}
                <Avatar size="sm">
                  <Avatar.Count>+9</Avatar.Count>
                </Avatar>
              </Avatar.Group>
            </Stack>
          </Stack>
        </section>

        <section className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
          <Stack
            direction="column"
            className="mb-6 w-full max-w-md gap-4 lg:hidden"
          >
            <Logo className="mx-auto h-9" />
            <Stack direction="column" className="gap-1 text-center">
              <Typography variant="heading-5">Welcome back</Typography>
              <Typography variant="body-2" className="text-gray-500">
                Sign in to continue to {appConfig.title}
              </Typography>
            </Stack>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-gray-50 p-3 text-center"
                >
                  <Typography
                    variant="body-1"
                    className="font-semibold text-primary"
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body-3" className="text-gray-500">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </Stack>

          <Card as={Form} onSubmit={submit} className="w-full max-w-md">
            <Card.Header className="hidden space-y-4 lg:block">
              <Stack direction="column" className="gap-1">
                <Typography variant="heading-5" className="text-gray-700">
                  Sign in
                </Typography>
                <Typography className="text-gray-500">
                  Enter your credentials to access your account
                </Typography>
              </Stack>
            </Card.Header>

            <Card.Body className="space-y-5">
              <Alert variant="soft" color="info">
                <Alert.Icon>
                  <Icon name="InfoCircle" className="size-5" />
                </Alert.Icon>
                <Alert.Content>
                  <Alert.Title>Secure login</Alert.Title>
                  <Alert.Description>
                    Your session is protected with end-to-end encryption.
                  </Alert.Description>
                </Alert.Content>
              </Alert>

              <Textfield
                label="Email"
                value={data.email}
                setValue={handleSetData("email")}
                rules={rules.email}
                required
                type="email"
                autoFocus
                prepend={<Icon name="Sms" className="size-4 text-gray-400" />}
                placeholder="you@company.com"
              />
              <Stack direction="column" className="gap-2">
                <Textfield
                  label="Password"
                  value={data.password}
                  setValue={handleSetData("password")}
                  required
                  type="password"
                  prepend={
                    <Icon name="Lock" className="size-4 text-gray-400" />
                  }
                  placeholder="Enter your password"
                />
                <Stack className="items-center justify-between gap-4">
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <Switch
                      checked={rememberMe}
                      onChange={setRememberMe}
                      size="sm"
                      color="primary"
                    />
                    <Typography variant="body-2" className="text-gray-600">
                      Remember me
                    </Typography>
                  </label>
                  <Button
                    type="button"
                    variant="text"
                    color="primary"
                    size="sm"
                    className="shadow-none"
                  >
                    Forgot password?
                  </Button>
                </Stack>
              </Stack>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isPending}
              >
                <Icon name="Login" className="size-5" />
                Sign in
              </Button>

              <Stack className="items-center gap-3">
                <Divider className="flex-1" />
                <Typography variant="body-3" className="shrink-0 text-gray-400">
                  or continue with
                </Typography>
                <Divider className="flex-1" />
              </Stack>

              <div className="grid grid-cols-3 gap-3">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.label}
                    type="button"
                    variant="outline"
                    color="dark"
                    size="sm"
                    className="w-full"
                  >
                    <Icon name={provider.icon} className="size-4" />
                    <span className="hidden sm:inline">{provider.label}</span>
                  </Button>
                ))}
              </div>
            </Card.Body>

            <Card.Footer className="flex flex-col gap-4 border-t">
              <Stack className="items-center justify-center gap-1">
                <Typography variant="body-2" className="text-gray-500">
                  Don&apos;t have an account?
                </Typography>
                <Button
                  as={Link}
                  to="/onboarding"
                  variant="text"
                  color="primary"
                  size="sm"
                  className="shadow-none"
                >
                  Create account
                </Button>
              </Stack>

              <Stack className="items-center justify-center gap-2">
                <Badge color="success" variant="soft" size="sm">
                  <Icon name="ShieldTick" className="size-3" />
                  SSL Secured
                </Badge>
                <Badge color="info" variant="soft" size="sm">
                  <Icon name="Clock" className="size-3" />
                  24/7 Support
                </Badge>
              </Stack>
            </Card.Footer>
          </Card>

          <Typography
            variant="body-3"
            className="mt-6 text-center text-gray-400"
          >
            &copy; {new Date().getFullYear()} {appConfig.title}. All rights
            reserved.
          </Typography>
        </section>
      </Layout.Body>
    </Layout>
  );
}
