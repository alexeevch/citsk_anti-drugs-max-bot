export interface CreateUserPayload {
  userId: number;
  chatId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  isBot: boolean;
}
