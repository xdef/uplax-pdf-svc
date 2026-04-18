export interface IProfile {
  id: string;
  avatar: string;
  status: "filled" | "created" | "deleted";
  nickname: string;
  first_name: string;
  last_name: string;
  middle_name: string | null | undefined;
  phone: string;
  email: string;
  gender: "female" | "male";
  personal_data_consent: boolean;
  personal_data_consent_at: string;
}

export interface IMember {
  profile_id: string;
  avatar: string;
  nickname: string;
}
