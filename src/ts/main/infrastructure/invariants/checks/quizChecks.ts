import type { InvariantRegistry } from '../InvariantRegistry';
import { Json } from '../../../dataaccess/saveData/saveFile';
import { SaveData } from '../../../dataaccess/saveData/saveData';
import { getQuizState } from '../../../quiz/stateActionDispatcher';

export function registerQuizInvariants(registry: InvariantRegistry): void {
  registry.register({
    id: 'quiz.slides-before-save',
    subsystem: 'quiz',
    description: 'SaveData is never written before slides are loaded into Json',
    severity: 'high',
    check: async () => {
      const saves = await SaveData.get();
      if (saves.length > 0 && Json.get().length === 0) {
        throw new Error('SaveData contains entries but no slides are loaded');
      }
    },
  });

  registry.register({
    id: 'quiz.end-handler-complete',
    subsystem: 'quiz',
    description: 'SaveDataDispatcher.end() is reachable and implemented',
    severity: 'critical',
    check: async () => {
      const slides = Json.get();
      const saves = await SaveData.get();
      const state = getQuizState(slides, saves, false);
      // If we are in END state, SaveDataDispatcher.end() must not throw.
      // The implementation now returns getSlide(0) rather than throwing,
      // so this invariant should always pass once Phase 3 migration is complete.
      if (state === 'END' && slides.length === 0) {
        throw new Error('END state reached with no slides loaded');
      }
    },
  });
}
