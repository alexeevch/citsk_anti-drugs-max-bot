import type { CreateComplaintPayload } from "~/modules/complaint/complaint.types.js";
import { complaintRepository } from "~/modules/complaint/complaint.repository.js";

export const complaintService = {
  async createComplaint(complaint: CreateComplaintPayload) {
    return await complaintRepository.create(complaint);
  },
};
