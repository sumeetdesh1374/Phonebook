import { url } from "inspector/promises";

function buildUrl(url: string): string  {
    const baseUrl = process.env.PHONEBOOK_API_URL || '';
    return `${baseUrl}${url}`;
}

export async function get(url: string,accessToken?: string, options?: RequestInit) {
   const result =  await fetchWithAuth(buildUrl(url), "GET", accessToken, options);
   return result;
  
}

export async function post(url: string,body:string,accessToken?: string, options?: RequestInit) {
   const reesult =  await fetchWithAuth(buildUrl(url), "POST", accessToken, { ...options, body });
    return reesult;
}

export async function put(url: string,body:string,accessToken?: string, options?: RequestInit) {
   const result =  await fetchWithAuth(buildUrl(url), "PUT", accessToken, { ...options, body });   
   return result;
   
}

export async function del(url: string,body:string,accessToken?: string, options?: RequestInit) {
   const result =  await fetchWithAuth(buildUrl(url), "DELETE", accessToken, { ...options, body });    
   return result;
   
}

export async function fetchWithAuth(url: string, method:string, accessToken?: string, options?: RequestInit) {  

    
    const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
   if (!response.ok) {

      
      console.log(response);
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return response.json();
}