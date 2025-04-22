import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = "44.34";
  const lon = "10.99";
  const apiKey = process.env.OPENWEATHER_API_KEY; // .env 파일에 저장해둔 키

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data); // 전체 JSON 응답 확인용
  } catch (error) {
    console.error("❌ API 호출 실패:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
