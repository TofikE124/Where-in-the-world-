import { useSearchParams } from "react-router-dom"

export default function Country()
{

    const searchParams = useSearchParams()
    console.log(searchParams.name)

    return(
        <>
        </>
    )
}