export async function fetchData<T>(url: string, signal?:AbortSignal): Promise<T> {
  const response = await fetch(url, { signal});
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  // Check if the content type is actually JSON
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON from ${url} but received ${contentType || 'unknown content'}`);
  }

  // Assert that the JSON response matches the generic type <T>
  return (await response.json()) as T;
}