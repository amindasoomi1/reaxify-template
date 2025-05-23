import { IconName } from "@/types";

const navItems = [
  {
    icon: "Home2" as IconName,
    label: "Dashboards",
    items: [
      [
        // { label: "Sales", to: "sales" },
        { label: "Sales", to: "" },
      ],
      [
        { label: "Login", to: "login" },
        { label: "Onboarding", to: "onboarding" },
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
