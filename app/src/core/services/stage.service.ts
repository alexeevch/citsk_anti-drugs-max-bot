import { stageRepository } from "~/core/repositories/stage.repository.js";

export const stageService = {
  async getAllStages() {
    return await stageRepository.findAll();
  },

  async getNextStage(currentName: string) {
    const stages = await stageRepository.findAll();
    const currentIndex = stages.findIndex((s) => s.name === currentName);

    if (currentIndex === -1 || currentIndex + 1 >= stages.length) {
      return null;
    }

    return stages[currentIndex + 1];
  },

  async getPrevStage(currentName: string) {
    const stages = await stageRepository.findAll();
    const currentIndex = stages.findIndex((s) => s.name === currentName);

    if (currentIndex <= 0) {
      return null;
    }

    return stages[currentIndex - 1];
  },

  async isFirstStage(name: string): Promise<boolean> {
    const stages = await stageRepository.findAll();
    const first = stages[0];
    return first?.name === name;
  },

  async isLastStage(name: string): Promise<boolean> {
    const stages = await stageRepository.findAll();
    const last = stages[stages.length - 1];
    return last?.name === name;
  },
};
