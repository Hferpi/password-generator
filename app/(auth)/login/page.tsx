import { getServerSession } from "next-auth";
import ImatgeAuth from "./components/imageAuth/imageAuth";
import { TabsForms } from "./components/TabsForms/TabsForms";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession()
    if(session){
        return redirect("/")
    }

    return (
        <div className=" grid md:grid-cols-2 w-full h-full max-h-screen overflow-hidden">
            <div className="flex justify-center h-full">
                <div className="text-white flex flex-col items-center justify-center p-6">
                    <h1 className="text-blue-500 text-2xl text-center mb-5">Login</h1>
                    <h2 className="text-4xl font-medium text-black">Welcome Back</h2>
                    <p className="text-center mb-6 mt-4 text-slate-400 text-sm">
                        Please enter your credentials to login
                    </p>
                   <TabsForms />
                </div>
            </div>
            
                <ImatgeAuth />
            
        </div>
    )
}