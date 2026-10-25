import { Icon } from "@/components";
import { useFormatPrice } from "@/hooks";
import { Layout } from "@/layouts";
import { IconName } from "@/types";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Progress,
  Stack,
  Table,
  Typography,
} from "reaxify/components";
import { cn } from "reaxify/helpers";

const stats = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12.5%",
    icon: "Profile2User" as IconName,
    color: "text-primary",
    bg: "bg-blue-50",
  },
  {
    title: "Present Today",
    value: "215",
    change: "+4.8%",
    icon: "UserTick" as IconName,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "On Leave",
    value: "18",
    change: "-2.4%",
    icon: "Calendar" as IconName,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Total Payroll",
    value: "$84.5K",
    change: "+6.2%",
    icon: "Wallet" as IconName,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const employees = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    department: "Design",
    date: "Oct 25, 2026",
    status: "Present",
  },
  {
    name: "Michael Chen",
    role: "Frontend Developer",
    department: "Engineering",
    date: "Oct 25, 2026",
    status: "Present",
  },
  {
    name: "Emma Wilson",
    role: "HR Manager",
    department: "Human Resources",
    date: "Oct 25, 2026",
    status: "On Leave",
  },
  {
    name: "James Rodriguez",
    role: "Marketing Specialist",
    department: "Marketing",
    date: "Oct 25, 2026",
    status: "Late",
  },
  {
    name: "Lisa Anderson",
    role: "Financial Analyst",
    department: "Finance",
    date: "Oct 25, 2026",
    status: "Present",
  },
];

const departments = [
  { name: "Engineering", count: 82, percent: 82, color: "primary" as const },
  { name: "Design", count: 38, percent: 38, color: "info" as const },
  { name: "Marketing", count: 56, percent: 56, color: "success" as const },
  {
    name: "Human Resources",
    count: 24,
    percent: 24,
    color: "warning" as const,
  },
];

const activities = [
  {
    title: "New employee onboarded",
    description: "Olivia Martinez joined the Design team",
    time: "10:45 AM",
    icon: "UserAdd" as IconName,
  },
  {
    title: "Leave request submitted",
    description: "Michael Chen requested 2 days off",
    time: "09:30 AM",
    icon: "Calendar" as IconName,
  },
  {
    title: "Payroll processed",
    description: "October payroll is ready for review",
    time: "Yesterday",
    icon: "Wallet" as IconName,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Home() {
  const formatPrice = useFormatPrice();

  return (
    <Layout>
      <Layout.Body className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <Stack className="items-center justify-between gap-4">
          <Stack direction="column" className="gap-1">
            <Typography variant="heading-4">HR Dashboard</Typography>
            <Typography variant="body-2" className="text-gray-500">
              Monitor your team and manage your workforce.
            </Typography>
          </Stack>

          {/* <Button color="primary" size="sm">
            <Icon name="Export" className="size-4" />
            Export Report
          </Button> */}
        </Stack>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.title} className="animate-card-enter glass-card">
              <Card.Body className="p-5">
                <Stack className="items-start justify-between gap-3">
                  <Stack direction="column" className="min-w-0 gap-3">
                    <Typography variant="body-2" className="text-gray-500">
                      {item.title}
                    </Typography>

                    <Typography variant="heading-3">{item.value}</Typography>

                    <Typography variant="body-3" className="text-emerald-600">
                      {item.change}{" "}
                      <span className="text-gray-400">vs last month</span>
                    </Typography>
                  </Stack>

                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                      item.bg,
                    )}
                  >
                    <Icon
                      name={item.icon}
                      className={cn("size-6", item.color)}
                    />
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </section>

        {/* Main content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Employee attendance */}
          <Card className="animate-card-enter glass-card xl:col-span-2">
            <Card.Header className="flex items-center justify-between gap-3">
              <Stack direction="column" className="gap-1">
                <Typography variant="heading-6">Employee Attendance</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Daily attendance overview
                </Typography>
              </Stack>

              <Button variant="outline" color="dark" size="sm">
                View All
              </Button>
            </Card.Header>

            <Card.Body className="p-0">
              <Table.Container>
                <Table hover>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Employee</Table.HeaderCell>
                      <Table.HeaderCell>Department</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {employees.map((employee) => (
                      <Table.Row key={employee.name}>
                        <Table.DataCell>
                          <Stack className="items-center gap-3">
                            <Avatar size="md">
                              <Avatar.Fallback>
                                {getInitials(employee.name)}
                              </Avatar.Fallback>
                            </Avatar>

                            <Stack direction="column" className="gap-0.5">
                              <Typography
                                variant="body-2"
                                className="font-medium"
                              >
                                {employee.name}
                              </Typography>
                              <Typography
                                variant="body-3"
                                className="text-gray-500"
                              >
                                {employee.role}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Table.DataCell>

                        <Table.DataCell>
                          <Typography variant="body-2">
                            {employee.department}
                          </Typography>
                        </Table.DataCell>

                        <Table.DataCell>
                          <Typography
                            variant="body-2"
                            className="text-gray-500"
                          >
                            {employee.date}
                          </Typography>
                        </Table.DataCell>

                        <Table.DataCell>
                          <Badge
                            color={
                              employee.status === "Present"
                                ? "success"
                                : employee.status === "Late"
                                  ? "warning"
                                  : "info"
                            }
                            variant="soft"
                            size="sm"
                          >
                            {employee.status}
                          </Badge>
                        </Table.DataCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Table.Container>
            </Card.Body>
          </Card>

          {/* Departments */}
          <Card className="animate-card-enter glass-card">
            <Card.Header>
              <Stack direction="column" className="gap-1">
                <Typography variant="heading-6">Departments</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Employee distribution
                </Typography>
              </Stack>
            </Card.Header>

            <Card.Body className="space-y-6">
              {departments.map((department) => (
                <Stack
                  key={department.name}
                  direction="column"
                  className="gap-2"
                >
                  <Stack className="items-center justify-between gap-2">
                    <Typography variant="body-2">{department.name}</Typography>
                    <Typography variant="body-2" className="font-medium">
                      {department.count}
                    </Typography>
                  </Stack>

                  <Progress
                    value={department.percent}
                    color={department.color}
                  />
                </Stack>
              ))}

              <Button
                variant="soft"
                color="primary"
                className="w-full"
                size="sm"
              >
                <Icon name="Profile2User" className="size-4" />
                Manage Departments
              </Button>
            </Card.Body>
          </Card>
        </section>

        {/* Bottom content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Payroll */}
          <Card className="animate-card-enter glass-card xl:col-span-2">
            <Card.Header className="flex items-center justify-between gap-3">
              <Stack direction="column" className="gap-1">
                <Typography variant="heading-6">Payroll Overview</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  October 2026
                </Typography>
              </Stack>

              <Badge color="success" variant="soft">
                Processed
              </Badge>
            </Card.Header>

            <Card.Body className="space-y-5">
              <div className="rounded-2xl bg-[#EEF2FF] p-5">
                <Typography variant="body-2" className="text-gray-500">
                  Total payroll
                </Typography>

                <Typography variant="heading-3" className="mt-2 text-primary">
                  {formatPrice(84500)}
                </Typography>

                <Stack className="mt-4 items-center justify-between gap-2">
                  <Typography variant="body-3" className="text-gray-500">
                    Monthly budget
                  </Typography>
                  <Typography variant="body-3" className="font-medium">
                    {formatPrice(100000)}
                  </Typography>
                </Stack>

                <Progress value={84.5} color="primary" className="mt-2" />

                <Typography variant="body-3" className="mt-2 text-gray-500">
                  84.5% of the monthly budget
                </Typography>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 p-4">
                  <Typography variant="body-3" className="text-gray-500">
                    Average salary
                  </Typography>
                  <Typography variant="heading-5" className="mt-2">
                    {formatPrice(3407)}
                  </Typography>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                  <Typography variant="body-3" className="text-gray-500">
                    Pending payments
                  </Typography>
                  <Typography variant="heading-5" className="mt-2">
                    {formatPrice(6200)}
                  </Typography>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Recent activity */}
          <Card className="animate-card-enter glass-card">
            <Card.Header>
              <Stack direction="column" className="gap-1">
                <Typography variant="heading-6">Recent Activity</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Latest updates from your team
                </Typography>
              </Stack>
            </Card.Header>

            <Card.Body>
              <Stack direction="column" className="gap-5">
                {activities.map((activity) => (
                  <Stack key={activity.title} className="items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <Icon
                        name={activity.icon}
                        className="size-5 text-gray-600"
                      />
                    </div>

                    <Stack direction="column" className="min-w-0 flex-1 gap-1">
                      <Typography variant="body-2" className="font-medium">
                        {activity.title}
                      </Typography>

                      <Typography variant="body-3" className="text-gray-500">
                        {activity.description}
                      </Typography>

                      <Typography variant="body-3" className="text-gray-400">
                        {activity.time}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Card.Body>

            <Card.Footer className="border-t">
              <Button
                variant="text"
                color="primary"
                className="w-full"
                size="sm"
              >
                View All Activities
              </Button>
            </Card.Footer>
          </Card>
        </section>
      </Layout.Body>
    </Layout>
  );
}
