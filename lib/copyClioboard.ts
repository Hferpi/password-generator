import { toast } from "sonner"

export const copyClioboard = (value: string) => {
    navigator.clipboard.writeText(value)
    toast("Copiado al portapapeles")
}