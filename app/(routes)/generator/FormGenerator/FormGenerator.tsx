"use client"

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle, User } from "lucide-react";
import { use, useEffect, useState } from "react";
import { copyClioboard } from "@/lib/copyClioboard";
import PasswordGenerator from "./PasswordGenerator/PasswordGenerator";
import { UserGenerator } from "../UserGenerator/UserGenerator";
import { generateCustomPassword } from "@/lib/generateCustomPassword";
import { generateRandomUsername } from "@/lib/generateRandomUser";
import { generateRandomEmail } from "@/lib/generateRandomEmail";

export function FormGenerator() {
    const [selectedValue, setSelectedValue] = useState<"password" | "user" | string>("password");
    const [itemValueInput, setItemValueInput] = useState<string>("");

    const [userTypeSelected, setUserTypeSelected] = useState("username");
    const [lengthPassword, setLengthPassword] = useState(11);
    const [isMayusSelected, setIsMayusSelected] = useState(true);
    const [isMinusSelected, setIsMinusSelected] = useState(true);
    const [isNumberSelected, setIsNumberSelected] = useState(true);
    const [isSpecialCharacters, setIsSpecialCharacters] = useState(true);

useEffect(() => {
    if (selectedValue === "user") {
        const newUserGenerated = generateRandomUsername();
        setItemValueInput(newUserGenerated);
}
    if (userTypeSelected === "email") {
        const newEmailGenerated = generateRandomEmail();
        setItemValueInput(newEmailGenerated);
    }
}, [selectedValue, userTypeSelected]);
    useEffect(() => {
        if (selectedValue === "password") {
            const newPassword = generateCustomPassword(lengthPassword, isMayusSelected, isMinusSelected, isNumberSelected, isSpecialCharacters);
            setItemValueInput(newPassword);
        }
    }, [lengthPassword, isMayusSelected, isMinusSelected, isNumberSelected, isSpecialCharacters, selectedValue]);

    const handleShuffleClick = () => {
        if (selectedValue === "password") {
            const newPassword = generateCustomPassword(lengthPassword, isMayusSelected, isMinusSelected, isNumberSelected, isSpecialCharacters);
            setItemValueInput(newPassword);
        }else if (selectedValue === "user") {
            if (userTypeSelected === "email") {
               const email = generateRandomEmail();
               setItemValueInput(email);
            }else{
            const username = generateRandomUsername();
            setItemValueInput(username);
        }}
    }

    return (
        <div className="mt-5 max-w-2xl">
            <div className="relative w-full">
                <Input placeholder="Input.." value={itemValueInput} onChange={() => console.log("Cambio")} />
                <Copy className="absolute top-2 right-12 cursor-pointer h-5 w-5"
                    onClick={() => copyClioboard(itemValueInput)} />
                <Shuffle className="absolute top-2 right-3 cursor-pointer h-5 w-5" onClick={handleShuffleClick} />
            </div>
            <div className="bg-slate-100 rounded-md shadow-md my-4 p-4">
                <p className="mb-4 text-slate-500 ">¿Qué tipo de contraseña deseas generar?</p>
                <RadioGroup defaultValue="password" onValueChange={(value) => setSelectedValue(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="password" id="r1" className="bg-white data-[state=checked]:border-blue-500 data-[state=checked]:border-2 w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                        </RadioGroupItem>
                        <Label htmlFor="r1">Password</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="user" id="r2" className="bg-white data-[state=checked]:border-blue-500 data-[state=checked]:border-2 w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                        </RadioGroupItem>
                        <Label htmlFor="r2">User</Label>
                    </div>
                </RadioGroup>
            </div>
            {selectedValue === "password" ? (
                <PasswordGenerator
                    isMayusSelected={isMayusSelected} setIsMayusSelected={setIsMayusSelected}
                    isMinusSelected={isMinusSelected} setIsMinusSelected={setIsMinusSelected}
                    isSpecialCharacters={isSpecialCharacters} setIsSpecialCharacters={setIsSpecialCharacters}
                    isNumberSelected={isNumberSelected} setIsNumberSelected={setIsNumberSelected}
                    lengthPassword={lengthPassword} setLengthPassword={setLengthPassword}
                />
            ) : (
               <UserGenerator setUserTypeSelected={setUserTypeSelected} />
            )}
        </div>

    );
}