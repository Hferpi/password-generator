import { LucideIcon } from "lucide-react";

export type SingleItemProps = {
    label: string;
    href: string;
    icon: LucideIcon;
    onClick?: () => void;
}