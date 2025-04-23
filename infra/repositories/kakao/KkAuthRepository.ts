export const KkAuthRepository = (clientId: string, redirectUri: string) => ({
  async getKakaoToken(code: string) {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
      }),
    });

    if (!res.ok) throw new Error('Failed to get Kakao token');
    const data = await res.json();
    return data.access_token;
  },

  async getKakaoUserInfo(token: string) {
    const res = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to get Kakao user info');
    const data = await res.json();

    const kakaoAccount = data.kakao_account;

    return {
      email: kakaoAccount.email,
      nickname: kakaoAccount.profile.nickname,
      profile_image: kakaoAccount.profile.profile_image_url,
      provider: 'kakao',
    };
  },
});