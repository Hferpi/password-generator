'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useState } from "react"
import { FormAddElement } from "../FormAddElement"

import { KeyRound } from "lucide-react"
export function HeaderMain(props: {userId: string}) {
    const { userId } = props

    const [openDialog, setOpenDialog] = useState(false)

    const closeDialogAndDropdown = () => {
        setOpenDialog(false)
    }

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-semibold">Todas las cajas fuertes</h1>
            <Button className="bg-green-600 rounded-full hover:cursor-pointer"
            onClick={() => setOpenDialog(true)}
            ><KeyRound/>Nueva contraseña</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent aria-describedby="" className="sm:max-w-[825px]">
                    <DialogHeader >
                        <DialogTitle>Nuevo elemento</DialogTitle>
                    </DialogHeader>
                    <FormAddElement userId={userId} closeDialog={closeDialogAndDropdown} />

                </DialogContent>
            </Dialog>
        </div>
    )
}