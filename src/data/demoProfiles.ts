import { UserProfile } from "../types/user";

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: "demo-1",
    fullName: "Olivia Johnson",
    age: "29",
    gender: "Female",
    city: "Bangalore",
    occupation: "UI/UX Designer",
    bio: "Looking for a meaningful relationship built on trust, kindness and shared adventures.",

    userType: "Never Married",

    interests: ["Travel", "Reading", "Photography"],
    goals: ["Long-term Relationship"],
    lifestyle: ["Non-Smoker", "Social Drinker"],
    values: ["Honesty", "Loyalty", "Family"],
    languages: ["English", "Hindi"],

    aiAnswers: [
      "I value honest communication.",
      "I appreciate emotional maturity.",
      "I want to build a happy family."
    ],

    photoURL:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",

    profileCompleted: true,
  },

  {
    id: "demo-2",
    fullName: "Sophia Williams",
    age: "31",
    gender: "Female",
    city: "Mumbai",
    occupation: "Architect",
    bio: "Coffee lover, traveler and someone who believes every new chapter deserves hope.",

    userType: "Divorced",

    interests: ["Fitness", "Cooking", "Travel"],
    goals: ["Marriage"],
    lifestyle: ["Non-Smoker"],
    values: ["Respect", "Communication", "Family"],
    languages: ["English"],

    aiAnswers: [
      "I believe trust is earned.",
      "Kindness matters every day.",
      "I want a peaceful relationship."
    ],

    photoURL:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",

    profileCompleted: true,
  },

  {
    id: "demo-3",
    fullName: "Emma Brown",
    age: "27",
    gender: "Female",
    city: "Delhi",
    occupation: "Software Engineer",
    bio: "Tech enthusiast who enjoys hiking, books and meaningful conversations.",

    userType: "Never Married",

    interests: ["Technology", "Hiking", "Reading"],
    goals: ["Long-term Relationship"],
    lifestyle: ["Non-Smoker"],
    values: ["Growth", "Honesty", "Empathy"],
    languages: ["English", "Hindi"],

    aiAnswers: [
      "Communication is everything.",
      "I admire emotional intelligence.",
      "I want a supportive partner."
    ],

    photoURL:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",

    profileCompleted: true,
  }
];