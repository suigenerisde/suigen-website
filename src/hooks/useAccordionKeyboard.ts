'use client';

import { useCallback, useRef, KeyboardEvent } from 'react';

interface UseAccordionKeyboardOptions {
  /** Number of items in the accordion */
  itemCount: number;
  /** Callback when an item should be toggled */
  onToggle: (index: number) => void;
}

interface UseAccordionKeyboardReturn {
  /** Array of refs to attach to each accordion button */
  buttonRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  /** Keyboard event handler to attach to each accordion button */
  getKeyDownHandler: (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * Custom hook for accordion keyboard navigation following WAI-ARIA patterns.
 *
 * Supports:
 * - Arrow Down: Move focus to next item (wraps to first from last)
 * - Arrow Up: Move focus to previous item (wraps to last from first)
 * - Home: Move focus to first item
 * - End: Move focus to last item
 * - Enter/Space: Toggle the currently focused item
 */
export function useAccordionKeyboard({
  itemCount,
  onToggle,
}: UseAccordionKeyboardOptions): UseAccordionKeyboardReturn {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusItem = useCallback((index: number) => {
    const button = buttonRefs.current[index];
    if (button) {
      button.focus();
    }
  }, []);

  const getKeyDownHandler = useCallback(
    (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
      let handled = true;

      switch (event.key) {
        case 'ArrowDown':
          // Move focus to next item, wrap to first from last
          focusItem((index + 1) % itemCount);
          break;

        case 'ArrowUp':
          // Move focus to previous item, wrap to last from first
          focusItem((index - 1 + itemCount) % itemCount);
          break;

        case 'Home':
          // Move focus to first item
          focusItem(0);
          break;

        case 'End':
          // Move focus to last item
          focusItem(itemCount - 1);
          break;

        case 'Enter':
        case ' ':
          // Toggle the currently focused item
          onToggle(index);
          break;

        default:
          handled = false;
      }

      if (handled) {
        event.preventDefault();
      }
    },
    [itemCount, onToggle, focusItem]
  );

  return {
    buttonRefs,
    getKeyDownHandler,
  };
}
