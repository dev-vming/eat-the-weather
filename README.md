# 🌤️ Eat the Weather

![image](https://github.com/user-attachments/assets/bb65d630-e1a7-4984-a347-b026344b3f3c)


---


## 🌈 주요 기능 설명

### 🔐 회원가입 & 로그인
![image](https://github.com/user-attachments/assets/e20cdc00-ce5a-4cc9-9fcc-a7b06afa0adb)


### 🌡️ 날씨 민감도 기반 개인화 (온보딩)
![image](https://github.com/user-attachments/assets/3ff3746b-5b69-4bf1-9cf7-f9a8dfc5c6d6)


### 🧭 위치 기반 날씨 정보
- **[초기]** 브라우저 위치 → Kakao API로 행정구역 확인 → OpenWeather API로 날씨 조회
- **[이후]** 즐겨찾기에 저장된 지역 선택 → OpenWeather API로 날씨 조회
![image](https://github.com/user-attachments/assets/3c4619ab-4463-4733-b1f7-48b8ba4aa341)


### 💬 지역 게시판 기능
- 대표 지역 기반으로 날씨 관련 이야기 공유
- 게시글 작성 시 **날씨/의류 태그** 필수 선택
- 댓글 작성 가능, **내 댓글만 삭제 가능**
- 좋아요 기능 제공
  
<br/>

---

## 🛠️ 기술 스택

![image](https://github.com/user-attachments/assets/a5a77ff6-a922-49d7-89c6-3c452f70c0b5)


---


## 🗂 데이터베이스 구조
![image](https://github.com/user-attachments/assets/ea2977c5-df2d-44fb-b4ed-297905253bf5)


---

## 📄 참고사항

- Supabase는 인증 기능은 사용하지 않고, **DB 전용**으로만 활용
- 클라이언트 API는 Axios 기반 커스텀 인스턴스 사용
- 외부 API는 'fetch' 사용 (예: Kakao 주소 API, 날씨 API)
- 백엔드 구조는 "클린 아키텍처" 기반 작성
  ![image](https://github.com/user-attachments/assets/88694e9b-f08b-44db-9d9d-e684d14127e2)

  <br/>

  
