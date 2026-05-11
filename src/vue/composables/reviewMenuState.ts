import { ref } from 'vue';
import type { ReviewBoundary, ReviewType } from '../../ts/main/review/reviewTypes';

export interface ReviewLaunchRequest {
  boundary: ReviewBoundary;
  type: ReviewType;
}

export const reviewMenuOpen = ref(false);
export const reviewLaunchPending = ref<ReviewLaunchRequest | null>(null);
