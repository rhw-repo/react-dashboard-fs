export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  // Assert that the JSON response matches the generic type <T>
  return (await response.json()) as T;
}