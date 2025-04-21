import { IconName } from "@/types";

const navItems = [
  {
    icon: "Home2" as IconName,
    label: "Dashboards",
    items: [
      [
        // { label: "Sales", to: "sales" },
        { label: "Sales", to: "" },
        { label: "CRM Analytics", to: "crm-analytics" },
        { label: "Orders", to: "orders" },
      ],
      [
        { label: "Personal", to: "personal" },
        { label: "Travel", to: "travel" },
      ],
    ],
  },
  {
    icon: "Gift" as IconName,
    label: "Apps",
    items: [
      [
        { label: "Chat", to: "chat" },
        { label: "Main", to: "main" },
        { label: "Todo", to: "todo" },
      ],
      [
        { label: "File Manager", to: "file-manager" },
        { label: "POS App", to: "pos-app" },
      ],
    ],
  },
  {
    icon: "Element3" as IconName,
    label: "Prototypes",
    items: [
      [{ label: "Post Details", to: "post-details" }],
      [{ label: "Errors", to: "errors" }],
    ],
  },
];

export default navItems;
