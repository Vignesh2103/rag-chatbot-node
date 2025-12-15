import redis from "../redis/redisClient.js";

const SESSION_TTL = 60 * 60; // 1 hour

const sessionKey = (sessionId) => `chat:${sessionId}`;

/**
 * Save a message to session history
 */
export async function saveMessage(sessionId, role, message) {
  const key = sessionKey(sessionId);

  await redis.rPush(
    key,
    JSON.stringify({
      role,
      message,
      timestamp: new Date().toISOString()
    })
  );

  await redis.expire(key, SESSION_TTL);
}

/**
 * Get full chat history of a session
 */
export async function getSessionHistory(sessionId) {
  const key = sessionKey(sessionId);

  const messages = await redis.lRange(key, 0, -1);

  return messages.map(msg => JSON.parse(msg));
}

/**
 * Clear session history
 */
export async function clearSession(sessionId) {
  await redis.del(sessionKey(sessionId));
}

/**
 * Check if session exists
 */
export async function sessionExists(sessionId) {
  return await redis.exists(sessionKey(sessionId));
}
