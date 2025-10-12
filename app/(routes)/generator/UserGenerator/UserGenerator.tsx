
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserGeneratorProps } from "./UserGenerator.types";
import { Label } from "@/components/ui/label";

export function UserGenerator(props: UserGeneratorProps) {
    const { setUserTypeSelected } = props;
    return (
        <div className="p-4 bg-slate-100 rounded-md shadow-md">
            <p className="mb-4 text-slate-500">¿Qué quieres generar?</p>
            <RadioGroup defaultValue="username" onValueChange={(value) => setUserTypeSelected(value)}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="username" id="r4" className="bg-white data-[state=checked]:border-blue-500 data-[state=checked]:border-2 w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                    </RadioGroupItem>
                    <Label htmlFor="r4">Nombre de usuario</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="email" id="r3" className="bg-white data-[state=checked]:border-blue-500 data-[state=checked]:border-2 w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                    </RadioGroupItem>
                    <Label htmlFor="r3">Email</Label>
                </div>
            </RadioGroup>
        </div>
    );
};
