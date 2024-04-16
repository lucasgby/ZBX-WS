import bcrypt from 'bcrypt';

export async function criptPassword(password: string, length: number) {
  const hashPassword = await bcrypt.hash(password, length);

  return hashPassword;
}