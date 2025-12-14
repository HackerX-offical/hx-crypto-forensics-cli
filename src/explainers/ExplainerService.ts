import { Explanation } from "../core/types";
import { THEORY_CONTENT } from "./content";

export class ExplainerService {
  /**
   * Retrieves educational content for a given topic/algorithm.
   */
  static getExplanation(topic: string): Explanation {
    const key = topic.toLowerCase();
    if (THEORY_CONTENT[key]) {
      return THEORY_CONTENT[key];
    }

    // Fallback/Generic
    return {
      title: "Unknown Topic",
      content: `No specific detailed explanation found for "${topic}".`,
      technicalDetails: "Try topics like: sha256, bcrypt, argon2, salt.",
    };
  }

  static getAllTopics(): string[] {
    return Object.keys(THEORY_CONTENT);
  }
}
