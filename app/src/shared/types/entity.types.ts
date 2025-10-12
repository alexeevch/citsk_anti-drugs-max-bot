export interface CreateUserPayload {
  userId: number;
  chatId?: number | null;
  firstName: string;
  isBot: boolean;
}

export interface CreateComplaintPayload {
  userId: number;
  categoryId: number;
  districtId: number;
  latitude?: number;
  longitude?: number;
  location?: string;
  message: string;
  photos?: {
    token: string;
    url: string;
  }[];
}
