import { Icon } from "@/components";
import { Layout } from "@/layouts";
import { IconName } from "@/types";
import { Card, Typography } from "reaxify/components";
import { cn } from "reaxify/helpers";

export default function Home() {
  const items = [
    {
      title: "Sales",
      value: "6.5K",
      percent: "4.5%",
      icon: "PresentionChart" as IconName,
      bgClasses: "bg-info/10",
      colorClasses: "text-info",
    },
    {
      title: "Customers",
      value: "12K",
      percent: "7.5%",
      icon: "Profile2User" as IconName,
      bgClasses: "bg-warning/10",
      colorClasses: "text-warning",
    },
    {
      title: "Products",
      value: "47K",
      percent: "8%",
      icon: "Box" as IconName,
      bgClasses: "bg-success/10",
      colorClasses: "text-success",
    },
    {
      title: "Revenue",
      value: "$128K",
      percent: "6.69",
      icon: "DollarCircle" as IconName,
      bgClasses: "bg-secondary/10",
      colorClasses: "text-secondary",
    },
  ];
  return (
    <Layout>
      <Layout.Body>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {items.map((e) => (
            <Card key={e.title} className="w-full">
              <Card.Body className="p-5 flex items-start gap-4">
                <div className="flex-1">
                  <Typography variant="body-1">{e.title}</Typography>
                  <Typography
                    variant="heading-4"
                    className={cn("mt-0.5", e.colorClasses)}
                  >
                    {e.value}
                  </Typography>
                  <Typography
                    variant="body-1"
                    className="mt-3 text-success inline-flex items-center"
                  >
                    <Icon name="ArrowUp" className="size-4" />
                    {e.percent}
                  </Typography>
                </div>
                <div
                  className={cn(
                    "size-12 flex items-center justify-center rounded-2xl",
                    e.bgClasses
                  )}
                >
                  <Icon
                    name={e.icon}
                    className={cn("size-6", e.colorClasses)}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </section>
      </Layout.Body>
    </Layout>
  );
}
