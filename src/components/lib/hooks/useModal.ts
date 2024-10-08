"use client";

import { useCallback, useEffect, useState } from "react";

type Modal = {
  open: boolean;
  /** Immediate change regardless of timer. Perfect for modal exit animations */
  safeOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type UseModalOptions = {
  timer?: number;
};

export function useModal(options?: UseModalOptions): Modal {
  const [open, setOpen] = useState(false);
  const [safeOpen, setSafeOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { timer } = options ?? {};

  const openModal = () => {
    setOpen(true);
    setSafeOpen(true);
  };

  const closeModal = useCallback(() => {
    setSafeOpen(false);

    if (!timer) {
      setOpen(false);
      return;
    }

    const id = setTimeout(() => {
      setOpen(false);
    }, timer);

    setTimeoutId(id);
  }, [timer]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return { open, safeOpen, openModal, closeModal };
}
