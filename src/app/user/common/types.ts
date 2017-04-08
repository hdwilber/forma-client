export class Session {
  id: string;
  ttl: number;
  created: Date;
  userId: string;
}

export class User{
  uid: string;
  email: string;
  password: string;
  confirmed: boolean;
  type: string;
}
