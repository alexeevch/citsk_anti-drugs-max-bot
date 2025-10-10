export interface CreateComplaintPayload {
  userId: number;
  categoryId: number;
  districtId: number;
  photoUrl?: string;
  latitude: number;
  longitude: number;
  message: string;
}
