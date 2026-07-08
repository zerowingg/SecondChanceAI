export interface UserProfile {
  id: string;

  fullName: string;
  age: string;
  gender: string;
  city: string;
  occupation: string;
  bio: string;

  userType: string;

  interests: string[];
  goals: string[];
  lifestyle: string[];
  values: string[];
  languages: string[];

  aiAnswers: string[];

  photoURL: string;

  profileCompleted: boolean;
}