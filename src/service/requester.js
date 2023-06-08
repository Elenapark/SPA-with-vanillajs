export async function requester(url, option) {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error("API 호출 에러");
  }

  return response.json();
}
