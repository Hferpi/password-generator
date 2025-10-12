import Link from "next/link";
import { SingleItemProps } from "./SingleItem.types";



export function SingleItem(props: SingleItemProps) {
    const {label, href, icon: Icon, onclick} = props;
    return (
       <Link href={href} onClick={onclick} className="flex items-center gap-2 p-2 hover:bg-blue-100/20 duartaion-300 transition-all rounded-md">
       <div className="bg-blue-100/20 p-2 rounded-md">
<Icon size={20} />
       </div>
       {label}
       </Link>
    )
}