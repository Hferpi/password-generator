
import HeaderGenerator from "./HeaderGenerator/HeaderGenerator";
import { FormGenerator } from "./FormGenerator";


export default function GeneratorPage() {
    return (
        <div>
            <h1 className="text-xl md:text-3xl font-semibold">Password Generator</h1>
            <HeaderGenerator />
            <FormGenerator />
        </div>
    );
}
