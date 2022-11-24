import { useEffect } from "react"
import { getPost } from "../../api/services"

export const LoginPages = () => {
    useEffect(() => { 
        getPosts()
    }, [])

    const getPosts = async () =>{
        try {
            const data = await getPost()
            console.log(data);
        } catch (error) {
            console.log({error});
        }
    }

    return (
        <>
            <div>
                design login here
            </div>
        </>
    )
}