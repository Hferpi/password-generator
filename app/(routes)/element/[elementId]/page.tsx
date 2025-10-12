import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { db } from '@/lib/db';
import { FormEditElement } from '@/components/Shared/FormEditElement';


export default async function ElementPage({params}: {params: {elementId: string}}) {
const sesion = await getServerSession();
if( !sesion || !sesion.user?.email ) {
    return redirect('/');
}
const element = await db.element.findUnique({
where:{
    id: params.elementId
}
})
if(!element) {
    redirect('/');
}
    return <div>
        <h1>Element page</h1>
        <div>
<FormEditElement dataElement={element} />
        </div>
    </div>;
}