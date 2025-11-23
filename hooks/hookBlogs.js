import { api } from "@/services/api/axios";
import { useEffect , useState } from "react";

export function hookBlogs () {
	const [blogs, setblogs] = useState([])
	const [loading , setloading] = useState(true)

	useEffect(()=> {
        api.get('blogs/all')
            .then(res => setblogs(res?.data?.data)) 
            .catch(error => console.error('Error:', error))
			.finally(() => setloading(false))
	},[])

	return { blogs, loading }
	
}
