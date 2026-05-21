export default async function handler(request, response) {
  const query = request.query.query

  if (!query || query.trim().length < 2) {
    return response
      .status(400)
      .json({ error: 'กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร' })
  }

  if (!process.env.API_NINJAS_KEY) {
    return response
      .status(500)
      .json({ error: 'ยังไม่ได้ตั้งค่า API_NINJAS_KEY' })
  }

  const apiResponse = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY,
      },
    },
  )

  const data = await apiResponse.json()

  return response.status(apiResponse.status).json(data)
}
