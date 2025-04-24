export interface UpdateUserRequestDto {
  nickname?: string;
  profile_image?: string;
  temperature_sensitivity?: number;
  onboarding_completed?: boolean;
}