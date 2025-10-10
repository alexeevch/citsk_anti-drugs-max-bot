export interface CreateUserPayload {
  userId: number;
  chatId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  isBot: boolean;
}

export interface CreateComplaintPayload {
  userId: number;
  categoryId: number;
  districtId: number;
  photoUrl?: string;
  latitude: number;
  longitude: number;
  message: string;
}
