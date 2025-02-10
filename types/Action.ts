export type Action = {
  label: string;
  actionId: string;
  variant?: "primary" | "secondary" | "transparent";
  disabled?: boolean;
};
