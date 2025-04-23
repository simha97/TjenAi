"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Language = {
  id: string;
  flag: string;
  name: string;
};

type FormData = {
  userLanguage: string;
  languageToLearn: string;
  level: "beginner" | "intermediate" | "fluent";
};

const languages: Language[] = [
  { id: "en", flag: "🇬🇧", name: "English" },
  { id: "es", flag: "🇪🇸", name: "Spanish" },
  { id: "fr", flag: "🇫🇷", name: "French" },
  { id: "de", flag: "🇩🇪", name: "German" },
  { id: "it", flag: "🇮🇹", name: "Italian" },
  { id: "pt", flag: "🇵🇹", name: "Portuguese" },
  { id: "ru", flag: "🇷🇺", name: "Russian" },
  { id: "zh", flag: "🇨🇳", name: "Chinese" },
  { id: "ja", flag: "🇯🇵", name: "Japanese" },
  { id: "ar", flag: "🇸🇦", name: "Arabic" },
];

const levels = ["beginner", "intermediate", "fluent"] as const;

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    userLanguage: "English",
    languageToLearn: "Italian",
    level: "beginner",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      userLanguage: formData.userLanguage,
      languageToLearn: formData.languageToLearn,
      level: formData.level,
    }).toString();
    router.push(`/chat?${query}`);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4 font-serif">
          TjenAI
        </h1>
        <h2 className="text-lg text-gray-700 mb-6 font-serif">
          AI chatbot for language learners
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
          aria-label="Language selection form"
        >
          <div>
            <label
              htmlFor="userLanguage"
              className="block mb-1 font-medium text-gray-500"
            >
              Select your native language:
            </label>
            <select
              id="userLanguage"
              name="userLanguage"
              value={formData.userLanguage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.name}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="languageToLearn"
              className="block mb-1 font-medium text-gray-500"
            >
              Select the language you want to learn:
            </label>
            <select
              id="languageToLearn"
              name="languageToLearn"
              value={formData.languageToLearn}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.name}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="mt-2" aria-describedby="level-description">
            <legend className="font-medium text-gray-700 mb-2">
              Select your level:
            </legend>
            <p id="level-description" className="text-sm text-gray-500 mb-2">
              Choose your current fluency level.
            </p>
            {levels.map((lvl) => (
              <label key={lvl} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  id={`level-${lvl}`}
                  value={lvl}
                  checked={formData.level === lvl}
                  onChange={handleChange}
                />
                {lvl}
              </label>
            ))}
          </fieldset>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Start Chatting!
          </button>
        </form>
      </div>
    </div>
  );
}
