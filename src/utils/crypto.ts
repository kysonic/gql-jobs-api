import crypto from 'crypto';

export const createMD5 = (str: string) =>
  crypto.createHash('md5').update(str).digest('hex');
