export enum Stage {
  Suspense = "suspense",
  Start = "start",
  CategoryChoose = "category_choose",
  DistrictChoose = "district_choose",
  ComplaintDescription = "complaint_description",
  PhotoSend = "photo_send",
  LocationSend = "location_send",
  ComplaintSubmit = "complaint_submit",
  Finish = "finish",
}

export enum Command {
  Start = "/start",
  Help = "/help",
  Rules = "/rules",
}
