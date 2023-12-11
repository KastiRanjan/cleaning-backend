export type TJwtPayload = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  tenant?: string;
  created_at?: Date;
  expiresAt?: string;
  secret?: string;
};
