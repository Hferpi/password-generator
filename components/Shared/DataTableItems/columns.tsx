"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Element } from "@/lib/generated/prisma"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal, User } from "lucide-react"
import { toast } from "sonner"


export type ColumProps = Element

export const columns: ColumnDef<ColumProps>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "typeElement",
        header: "Type  Element",
    },
    {
        accessorKey: "urlWebsite",
        header: "Url Website",
    },
    {
        accessorKey: "directory",
        header: "Directory",
    }, {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const password = row.original.password
            const username = row.original.username

            const onEditElement = () => {
                window.location.href = `/element/${row.original.id}`
            }
            const copyToClipboard = (item: string, name: string) => {
                navigator.clipboard.writeText(item);
                toast.success(`${name} copied to clipboard`)
            };

            return (
                <div className="flex gap-2 justify-center items-center">
                    {password && (
                        <Copy className="w-4 h-4 cursor-pointer"
                            onClick={() => copyToClipboard(password, "Password")}
                        />
                    )}
                    {username && (
                        <User className="w-4 h-4 cursor-pointer"
                            onClick={() => copyToClipboard(username, "Username")}
                        />
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 p-0 h-8">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={onEditElement}>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    },
];

