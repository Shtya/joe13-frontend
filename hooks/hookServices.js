import { api } from "@/services/api/axios";
import { useEffect , useState } from "react";

export function hookServices() {
	const [services, setservices] = useState([])
	const [loading , setloading] = useState(true)
  
	useEffect(()=> {
        api.get('projects/index')
            .then(res => setservices(res?.data?.data)) 
            .catch(error => console.error('Error:', error))
			.finally(() => setloading(false))
	},[])

	return { services, loading }
	
}
