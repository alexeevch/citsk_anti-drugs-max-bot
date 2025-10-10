import type { CreateUserPayload } from "~/modules/user/user.types.js";
import { userRepository } from "~/modules/user/user.repository.js";

export const userService = {
  async syncUser(user: CreateUserPayload) {
    await userRepository.sync(user);
  },
};
