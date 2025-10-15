import Link from "next/link"



export async function Logo  (props: {username: string}) {
    const {username} = props
    console.log(username)
    return (
            <Link href="/">
                <h1 className="text-xl font-bold text-center">👋🏽¡Hola de nuevo, {username}</h1>
            </Link>
    )
}