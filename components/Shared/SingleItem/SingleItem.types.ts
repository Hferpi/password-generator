import { LucideIcon } from "lucide-react";

export type SingleItemProps = {
    label: string;
    href: string;
    icon: LucideIcon;
    onclick?: () => void;
}