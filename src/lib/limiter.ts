import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

const shortTermLimiter = new RateLimiterMemory({
  points: 30, 
  duration: 60, 
  blockDuration: 600, 
});

/**
 * @param {string} key Kunci identifikasi (sessionId)
 */
export async function consumeRateLimit(key: string) {
  try {
    const rateLimiterRes: RateLimiterRes = await shortTermLimiter.consume(key);

    return {
      success: true,
      isBanned: false,
      limit: shortTermLimiter.points,
      remaining: rateLimiterRes.remainingPoints,
      reset: Math.ceil(rateLimiterRes.msBeforeNext / 1000), 
    };
  } catch (err) {
    const rateLimiterRes = err as RateLimiterRes; 
    const resetTime = Math.ceil(rateLimiterRes.msBeforeNext / 1000);

    return {
      success: false,
      isBanned: true,
      limit: shortTermLimiter.points,
      remaining: 0,
      reset: resetTime,
    };
  }
}