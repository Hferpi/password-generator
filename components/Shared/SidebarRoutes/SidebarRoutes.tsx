"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BarChart, DoorClosed, House, RectangleEllipsis } from "lucide-react"
import Link from "next/link"
import { SingleItem } from "../SingleItem"
import { dataSidebarElements, dataSidebarConfiguration } from "./SidebarRoutes.data"
import { signOut } from "next-auth/react"

export function SidebarRoutes({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div>
      <SingleItem href="/" icon={House} label="Homepage" onClick={onNavigate} />

      {dataSidebarElements.map(({ title, icon: Icon, children }) => (
        <Accordion type="single" collapsible key={title} className="w-full px-2">
          <AccordionItem value="item-1" className="border-b-0 ">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <div className="bg-blue-100/20 p-2 rounded-md">
                  <Icon size={20} />
                </div>
                {title}
              </div>

            </AccordionTrigger>
            <AccordionContent>
              {children.map(({ item, href, icon: Icon }) => (
                <div key={item}>
                  <Link href={href}
                    onClick={onNavigate}
                    className="px-6 py-2 flex gap-2 items-center hover:bg-blue-100/20 duration-300 transition-all rounded-md">

                    <Icon size={20} />
                    {item}
                  </Link>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      <SingleItem href="/generator" label="Generator" icon={RectangleEllipsis} onClick={onNavigate} />

      {dataSidebarConfiguration.map(({ title, icon: Icon, children }) => (
        <Accordion type="single" collapsible key={title} className="w-full px-2">
          <AccordionItem value="item-1" className="border-b-0 ">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <div className="bg-blue-100/20 p-2 rounded-md">
                  <Icon size={20} />
                </div>
                {title}
              </div>

            </AccordionTrigger>
            <AccordionContent>
              {children.map(({ item, href, icon: Icon, premium }) => (
                <div key={item} className="flex items-center justify-between  mt-2 hover:bg-blue-100/20 duration-300 transition-all rounded-md pr-1">
                  <Link href={href} onClick={onNavigate} className="px-6 py-2 flex gap2 items-center">
                    <Icon size={20} />
                    {item}
                  </Link>
                  {premium && <span className="text-xs gap-2 flex px-2 py-1 bg-blue-400 rounded-md cursor-not-allowed">Dissable</span>}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      ))}

      <SingleItem href="/analytics" label="Analytics" icon={BarChart} onClick={onNavigate} />
      <SingleItem onClick={() => { onNavigate && onNavigate(); signOut() }} label="Logout" href="#" icon={DoorClosed}/>

    </div>
      )
}