import { deleteQueueTypeProvider, queue_provider, setQueueProvider, shop_provider, updateQueueProvider } from "~/provider/provider";
import { useAuth } from "~/utils/auth";

export interface QueueType {
    id: number;
    name: string;
    description: string;
    image_url?: string;
    queue_counter: number;
    is_available: boolean;
    tag: string;
    shop_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface QueueTypePayload {
    shop_id : number
    name : string,
    image? : File,
    description : string,
    is_available : boolean,
    tag : string,
}

export async function fetchingQueuesType(request: Request, shop_id: number) {
    try {
    
        const { getCookie } = useAuth
        const cookie = await getCookie({ request });
        const token = cookie.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues?shop_id=${shop_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });        
        const data = await response.json();
        const queueTypes = data.data;
        setQueueProvider(shop_id, queueTypes);
        return {
            queueTypes : queue_provider[shop_id]
        };

    } catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}

export async function createQueueType(request: Request, payload: FormData) {
    try {
        const { getCookie } = useAuth;
        const data = await getCookie({ request });
        const token = data.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept" : "application/json"
          },
          body: payload, 
        });
        const res = await response.json();
        
       
        updateQueueProvider(res.data.shop_id, res.data);
        

    } catch (e) {
        console.error("error creating queue type : ", e);
    }
}

export async function deleteQueueType(request: Request, queue_id: number, shop_id: number) {
    try {
        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;

        const response = await fetch(`${process.env.API_BASE_URL}/queues/${queue_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            method : "DELETE"
        });

        deleteQueueTypeProvider(shop_id,queue_id);

        return response;

    }
    catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}

export async function updateQueueType(request: Request, queue_id: number, payload: FormData) {
    try {

        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;
        console.log("Payload : ", payload);
        const response = await fetch(`${process.env.API_BASE_URL}/queues/${queue_id}`, {
            headers: {
            "Authorization": `Bearer ${token}`,
            },
            method : "POST",
            body : payload
        });
        
        const data = await response.json();



        delete data.data.shop
        const queueTypePayload : QueueType = data.data;
        updateQueueProvider(queueTypePayload.shop_id, queueTypePayload);
        return data;

    } catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}

export async function fetchQueueDetail(request: Request, queue_id: number) {
    try {
        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues/${queue_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();
        const queue = data;
        return queue;

    } catch (error) {
        console.error("Error fetching queue detail:", error);
        return { code: 500, data: [] };
    }
}

export async function fetchCustomerInQueue(request: Request, shop_id: number) {
    try {
        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues/${shop_id}/getAllQueue`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            method : "GET"
        });

        const data = await response.json();
        const inQueues = data;
        return inQueues;

    } catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}

export async function skipQueue(request : Request, queue_id: number ) {
    try {
        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues/${queue_id}/cancel`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            method : "POST"
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}
export async function nextQueue(request : Request, queue_id: number ) {
    try {
        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues/${queue_id}/next`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            method : "POST"
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}

export async function changeQueueStatus(request: Request, queue_id: number, status: boolean) {
    try {
        const { getCookie } = useAuth;
        const cookie = await getCookie({ request });
        const token = cookie.token;
        const response = await fetch(`${process.env.API_BASE_URL}/queues/${queue_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method : "PATCH",
            body : JSON.stringify({
                "is_available" : status
            })
        });

        const data = await response.json();
        delete data.data.shop
        const queueTypePayload : QueueType = data.data;
        updateQueueProvider(queueTypePayload.shop_id, queueTypePayload);
        return data;

    } catch (error) {
        console.error("Error fetching queue types:", error);
        return { code: 500, data: [] };
    }
}