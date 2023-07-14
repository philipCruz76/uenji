import { useState } from 'react';

type SwipeDirection = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';

const MIN_SWIPE_DISTANCE = 50; // minimum distance in pixels for a swipe to be detected
const MAX_SWIPE_TIME = 500; // maximum time in milliseconds for a swipe to be detected

let touchStartX: number;
let touchStartY: number;
let touchStartTime: number;

function useSwipeDetection(): SwipeDirection | null {
    const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchStartTime = Date.now();
    }

    function handleTouchEnd(event: TouchEvent) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;

        if (deltaTime <= MAX_SWIPE_TIME) {
            if (Math.abs(deltaX) >= MIN_SWIPE_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY)) {
                const direction: SwipeDirection = deltaX < 0 ? 'LEFT' : 'RIGHT';
                setSwipeDirection(direction);
            } else if (Math.abs(deltaY) >= MIN_SWIPE_DISTANCE && Math.abs(deltaY) > Math.abs(deltaX)) {
                const direction: SwipeDirection = deltaY < 0 ? 'UP' : 'DOWN';
                setSwipeDirection(direction);
            }
        }
    }

    return swipeDirection;
}

export default useSwipeDetection;

