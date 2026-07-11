export interface Lifestyle {
  personality: string;
  smoking: string;
  drinking: string;
  children: string;
}

export interface AIAnswers {
  previousRelationship?: string;
  partnerExpectations?: string;
  futureGoals?: string;
}

export interface UserProfile {
  id: string;

  fullName: string;
  age: string;

  gender: string;

  // NEW
  interestedIn: string;

  city: string;
  occupation: string;
  bio: string;

  userType: string;

  interests: string[];
  goals: string[];

  lifestyle: Lifestyle;

  values: string[];
  languages: string[];

  aiAnswers: AIAnswers;

  photoURL: string;

  profileCompleted: boolean;
}