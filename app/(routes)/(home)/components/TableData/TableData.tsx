"use client"

import { Element } from "@/lib/generated/prisma"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export type TableDataProps = {
    data: Element[]
}

export function TableData(props: TableDataProps){
const elements = props.data;

    return(
        <div className="py-10">
            <DataTable columns={columns} data={elements} />
            </div>
    )
}