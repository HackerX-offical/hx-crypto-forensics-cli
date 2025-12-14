import { Explanation } from "../core/types";

export const THEORY_CONTENT: Record<string, Explanation> = {
  sha256: {
    title: "SHA-256 (Secure Hash Algorithm 256-bit)",
    content:
      "A deterministic hashing algorithm. It is fast and designed for digital signatures and file integrity, NOT for password storage.",
    technicalDetails:
      "Output: 256 bits (64 hex characters). Rounds: 64. Block size: 512 bits. Speed: Very fast (>100M hashes/sec on GPU).",
    example:
      'SHA256("password") -> 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
  },
  bcrypt: {
    title: "Bcrypt",
    content:
      "A password hashing function based on the Blowfish cipher. It incorporates a salt to protect against rainbow table attacks and is adaptive, meaning you can increase the iteration count (work factor) to keep it slow as hardware gets faster.",
    technicalDetails:
      "Output: 60 characters usually. Structure: $2a$[cost]$[22 char salt][31 char hash]. Key setup is expensive. GPU unfriendly.",
    example: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  },
  argon2: {
    title: "Argon2",
    content:
      "The winner of the Password Hashing Competition (2015). It is memory-hard, making it resistant to GPU/ASIC attacks. It has three variants: Argon2d (data-dependent, anti-GPU), Argon2i (side-channel resistant), and Argon2id (hybrid, recommended).",
    technicalDetails:
      "Parameters: Memory (m), Time (t), Parallelism (p). It fills a memory buffer to force attackers to use RAM, which is expensive at scale.",
  },
  salt: {
    title: "Cryptographic Salt",
    content:
      "A random string of data added to the password before hashing. It ensures that two users with the same password have different hashes.",
    technicalDetails:
      "Must be globally unique per user. Recommended length: 16 bytes. Stored alongside the hash (it is not a secret).",
  },
};
