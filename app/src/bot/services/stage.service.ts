import { Stage } from "~/bot/utils/enum.util.js";

export class StageService {
  private static readonly stages: Stage[] = [
    Stage.Suspense,
    Stage.Start,
    Stage.CategoryChoose,
    Stage.DistrictChoose,
    Stage.ComplaintDescription,
    Stage.PhotoSend,
    Stage.LocationSend,
    Stage.Finish,
  ];

  constructor(private current: Stage = Stage.Suspense) {}

  public get currentStage(): Stage {
    return this.current;
  }

  public next(): Stage {
    const index = StageService.stages.indexOf(this.current);

    if (index !== -1 && index < StageService.stages.length - 1) {
      this.current = StageService.stages[index + 1]!;
    }

    return this.current;
  }

  public prev(): Stage {
    const index = StageService.stages.indexOf(this.current);
    if (index > 0) {
      this.current = StageService.stages[index - 1]!;
    }

    return this.current;
  }

  public goTo(stage: Stage): boolean {
    if (StageService.stages.includes(stage)) {
      this.current = stage;
      return true;
    }

    return false;
  }

  public isLast(): boolean {
    return this.current === StageService.stages[StageService.stages.length - 1];
  }

  public reset(): Stage {
    this.current = StageService.stages[0]!;

    return this.current;
  }
}
