import { Icon } from "@/components";
import { useFormatDate, useFormatPrice } from "@/hooks";
import { Layout } from "@/layouts";
import { IconName } from "@/types";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Progress,
  Stack,
  Table,
  Typography,
} from "reaxify/components";
import { cn } from "reaxify/helpers";
import { Color } from "reaxify/types";

type StatItem = {
  title: string;
  value: string;
  percent: string;
  icon: IconName;
  bgClasses: string;
  colorClasses: string;
};

type OrderStatus = "completed" | "pending" | "processing" | "cancelled";

const orderStatusMap: Record<OrderStatus, { label: string; color: Color }> = {
  completed: { label: "Completed", color: "success" },
  pending: { label: "Pending", color: "warning" },
  processing: { label: "Processing", color: "info" },
  cancelled: { label: "Cancelled", color: "danger" },
};

const stats: StatItem[] = [
  {
    title: "Sales",
    value: "6.5K",
    percent: "4.5%",
    icon: "PresentionChart",
    bgClasses: "bg-light-info",
    colorClasses: "text-info",
  },
  {
    title: "Customers",
    value: "12K",
    percent: "7.5%",
    icon: "Profile2User",
    bgClasses: "bg-light-warning",
    colorClasses: "text-warning",
  },
  {
    title: "Products",
    value: "47K",
    percent: "8%",
    icon: "Box",
    bgClasses: "bg-light-success",
    colorClasses: "text-success",
  },
  {
    title: "Revenue",
    value: "$128K",
    percent: "6.69%",
    icon: "DollarCircle",
    bgClasses: "bg-light-secondary",
    colorClasses: "text-secondary",
  },
];

const recentOrders = [
  {
    id: "#ORD-1042",
    customer: "Sarah Johnson",
    amount: 249.99,
    date: "2026-06-10T14:30:00",
    status: "completed" as OrderStatus,
  },
  {
    id: "#ORD-1041",
    customer: "Michael Chen",
    amount: 89.5,
    date: "2026-06-10T11:15:00",
    status: "processing" as OrderStatus,
  },
  {
    id: "#ORD-1040",
    customer: "Emma Wilson",
    amount: 512.0,
    date: "2026-06-09T18:45:00",
    status: "pending" as OrderStatus,
  },
  {
    id: "#ORD-1039",
    customer: "James Rodriguez",
    amount: 34.99,
    date: "2026-06-09T09:20:00",
    status: "completed" as OrderStatus,
  },
  {
    id: "#ORD-1038",
    customer: "Lisa Anderson",
    amount: 178.25,
    date: "2026-06-08T16:00:00",
    status: "cancelled" as OrderStatus,
  },
];

const customers = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    orders: 24,
    spent: 4820,
    active: true,
  },
  {
    name: "Michael Chen",
    email: "mchen@email.com",
    orders: 18,
    spent: 3150,
    active: true,
  },
  {
    name: "James Rodriguez",
    email: "j.rodriguez@email.com",
    orders: 7,
    spent: 890,
    active: false,
  },
  {
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    orders: 12,
    spent: 2100,
    active: true,
  },
];

const financialReport = [
  {
    label: "Product Sales",
    amount: 84200,
    target: 100000,
    color: "primary" as Color,
  },
  {
    label: "Subscriptions",
    amount: 28600,
    target: 35000,
    color: "info" as Color,
  },
  {
    label: "Services",
    amount: 15400,
    target: 20000,
    color: "success" as Color,
  },
  { label: "Affiliate", amount: 4200, target: 8000, color: "warning" as Color },
];

const topProducts = [
  { name: "Wireless Headphones", sold: 342, revenue: 27360, trend: 12.4 },
  { name: "Smart Watch Pro", sold: 218, revenue: 43600, trend: 8.2 },
  { name: "USB-C Hub", sold: 567, revenue: 17010, trend: -2.1 },
  { name: "Laptop Stand", sold: 189, revenue: 7560, trend: 5.7 },
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
  const formatDate = useFormatDate();

  const totalRevenue = financialReport.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalTarget = financialReport.reduce(
    (sum, item) => sum + item.target,
    0,
  );
  const revenueProgress = Math.round((totalRevenue / totalTarget) * 100);

  return (
    <Layout>
      <Layout.Body className="space-y-6">
        <Stack className="items-start justify-between gap-4 sm:items-center">
          <Stack direction="column" className="gap-1">
            <Typography variant="heading-5">Dashboard</Typography>
            <Typography variant="body-2" className="text-gray-500">
              Welcome back! Here is what is happening with your store today.
            </Typography>
          </Stack>
          <Button variant="outline" color="dark" size="sm" className="shrink-0">
            <Icon name="Export" className="size-4" />
            Export Report
          </Button>
        </Stack>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((item) => (
            <Card key={item.title} className="w-full">
              <Card.Body className="flex items-start gap-4 p-5">
                <div className="flex-1">
                  <Typography variant="body-1">{item.title}</Typography>
                  <Typography
                    variant="heading-4"
                    className={cn("mt-0.5", item.colorClasses)}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="body-1"
                    className="mt-3 inline-flex items-center text-success"
                  >
                    <Icon name="ArrowUp" className="size-4" />
                    {item.percent}
                  </Typography>
                </div>
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl",
                    item.bgClasses,
                  )}
                >
                  <Icon
                    name={item.icon}
                    className={cn("size-6", item.colorClasses)}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
          <Card className="lg:col-span-3">
            <Card.Header className="flex items-center justify-between gap-4">
              <Stack direction="column" className="gap-0.5">
                <Typography variant="heading-6">Recent Orders</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Latest transactions from your store
                </Typography>
              </Stack>
              <Button variant="text" color="primary" size="sm">
                View all
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table.Container>
                <Table hover striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Order</Table.HeaderCell>
                      <Table.HeaderCell>Customer</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {recentOrders.map((order) => {
                      const status = orderStatusMap[order.status];
                      return (
                        <Table.Row key={order.id}>
                          <Table.DataCell>
                            <Typography
                              variant="body-2"
                              className="font-medium"
                            >
                              {order.id}
                            </Typography>
                          </Table.DataCell>
                          <Table.DataCell>{order.customer}</Table.DataCell>
                          <Table.DataCell>
                            {formatPrice(order.amount)}
                          </Table.DataCell>
                          <Table.DataCell className="text-gray-500">
                            {formatDate(order.date, "date-time")}
                          </Table.DataCell>
                          <Table.DataCell>
                            <Badge
                              color={status.color}
                              variant="soft"
                              size="sm"
                            >
                              {status.label}
                            </Badge>
                          </Table.DataCell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </Table.Container>
            </Card.Body>
          </Card>

          <Card className="lg:col-span-2">
            <Card.Header>
              <Stack direction="column" className="gap-0.5">
                <Typography variant="heading-6">Financial Report</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Revenue breakdown this month
                </Typography>
              </Stack>
            </Card.Header>
            <Card.Body className="space-y-5">
              <div className="rounded-xl bg-light-primary p-4">
                <Stack className="items-start justify-between gap-2">
                  <Stack direction="column" className="gap-0.5">
                    <Typography variant="body-2" className="text-gray-600">
                      Total Revenue
                    </Typography>
                    <Typography variant="heading-4" className="text-primary">
                      {formatPrice(totalRevenue)}
                    </Typography>
                  </Stack>
                  <Badge color="success" variant="soft" size="sm">
                    <Icon name="ArrowUp" className="size-3" />
                    {revenueProgress}%
                  </Badge>
                </Stack>
                <Progress
                  value={revenueProgress}
                  color="primary"
                  className="mt-3"
                />
                <Typography variant="body-3" className="mt-2 text-gray-500">
                  Target: {formatPrice(totalTarget)}
                </Typography>
              </div>

              <Divider />

              <Stack direction="column" className="gap-4">
                {financialReport.map((item) => {
                  const progress = Math.round(
                    (item.amount / item.target) * 100,
                  );
                  return (
                    <Stack
                      key={item.label}
                      direction="column"
                      className="gap-1.5"
                    >
                      <Stack className="items-center justify-between gap-2">
                        <Typography variant="body-2">{item.label}</Typography>
                        <Typography variant="body-2" className="font-medium">
                          {formatPrice(item.amount)}
                        </Typography>
                      </Stack>
                      <Progress value={progress} color={item.color} />
                    </Stack>
                  );
                })}
              </Stack>
            </Card.Body>
            <Card.Footer className="flex items-center justify-between gap-4 border-t">
              <Stack className="items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-light-success">
                  <Icon name="Wallet" className="size-4 text-success" />
                </div>
                <Stack direction="column" className="gap-0">
                  <Typography variant="body-3" className="text-gray-500">
                    Net Profit
                  </Typography>
                  <Typography
                    variant="body-1"
                    className="font-medium text-success"
                  >
                    {formatPrice(32400)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack className="items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-light-danger">
                  <Icon name="Receipt" className="size-4 text-danger" />
                </div>
                <Stack direction="column" className="gap-0">
                  <Typography variant="body-3" className="text-gray-500">
                    Expenses
                  </Typography>
                  <Typography
                    variant="body-1"
                    className="font-medium text-danger"
                  >
                    {formatPrice(9800)}
                  </Typography>
                </Stack>
              </Stack>
            </Card.Footer>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
          <Card className="lg:col-span-3">
            <Card.Header className="flex items-center justify-between gap-4">
              <Stack direction="column" className="gap-0.5">
                <Typography variant="heading-6">Customers</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Your most active buyers
                </Typography>
              </Stack>
              <Avatar.Group>
                {customers.slice(0, 4).map((customer) => (
                  <Avatar key={customer.email} size="sm">
                    <Avatar.Fallback>
                      {getInitials(customer.name)}
                    </Avatar.Fallback>
                  </Avatar>
                ))}
                <Avatar.Count>+8</Avatar.Count>
              </Avatar.Group>
            </Card.Header>
            <Card.Body className="p-0">
              <Table.Container>
                <Table hover>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Customer</Table.HeaderCell>
                      <Table.HeaderCell>Orders</Table.HeaderCell>
                      <Table.HeaderCell>Total Spent</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {customers.map((customer) => (
                      <Table.Row key={customer.email}>
                        <Table.DataCell>
                          <Stack className="items-center gap-3">
                            <Avatar size="sm">
                              <Avatar.Fallback>
                                {getInitials(customer.name)}
                              </Avatar.Fallback>
                            </Avatar>
                            <Stack direction="column" className="gap-0">
                              <Typography
                                variant="body-2"
                                className="font-medium"
                              >
                                {customer.name}
                              </Typography>
                              <Typography
                                variant="body-3"
                                className="text-gray-500"
                              >
                                {customer.email}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Table.DataCell>
                        <Table.DataCell>{customer.orders}</Table.DataCell>
                        <Table.DataCell>
                          {formatPrice(customer.spent)}
                        </Table.DataCell>
                        <Table.DataCell>
                          <Badge
                            color={customer.active ? "success" : "danger"}
                            variant="soft"
                            size="sm"
                          >
                            {customer.active ? "Active" : "Inactive"}
                          </Badge>
                        </Table.DataCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Table.Container>
            </Card.Body>
          </Card>

          <Card className="lg:col-span-2">
            <Card.Header>
              <Stack direction="column" className="gap-0.5">
                <Typography variant="heading-6">Top Products</Typography>
                <Typography variant="body-3" className="text-gray-500">
                  Best sellers this week
                </Typography>
              </Stack>
            </Card.Header>
            <Card.Body className="space-y-4">
              {topProducts.map((product, index) => (
                <Stack key={product.name} className="items-center gap-3">
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
                      index === 0
                        ? "bg-light-warning text-warning"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {index + 1}
                  </div>
                  <Stack direction="column" className="min-w-0 flex-1 gap-0">
                    <Typography
                      variant="body-2"
                      className="truncate font-medium"
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body-3" className="text-gray-500">
                      {product.sold} sold · {formatPrice(product.revenue)}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body-3"
                    className={cn(
                      "inline-flex shrink-0 items-center gap-0.5 font-medium",
                      product.trend >= 0 ? "text-success" : "text-danger",
                    )}
                  >
                    <Icon
                      name={product.trend >= 0 ? "ArrowUp" : "ArrowDown"}
                      className="size-3"
                    />
                    {Math.abs(product.trend)}%
                  </Typography>
                </Stack>
              ))}
            </Card.Body>
            <Card.Footer className="border-t">
              <Button
                variant="soft"
                color="primary"
                className="w-full"
                size="sm"
              >
                <Icon name="Chart" className="size-4" />
                View Analytics
              </Button>
            </Card.Footer>
          </Card>
        </section>
      </Layout.Body>
    </Layout>
  );
}
