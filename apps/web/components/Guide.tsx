"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  IconPencilPlus,
  IconLink,
  IconUsers,
  IconQuestionMark,
  IconX,
} from "@tabler/icons-react";

const steps = [
  {
    icon: IconPencilPlus,
    title: "Create a room",
    description:
      "Pick a name for your room and hit create. It's your own private canvas.",
  },
  {
    icon: IconLink,
    title: "Share the link",
    description:
      "Copy the room link or share it straight to WhatsApp or Email — no signup needed to join.",
  },
  {
    icon: IconUsers,
    title: "Draw together",
    description:
      "Everyone who opens the link sees the same canvas update live, in real time.",
  },
];

export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-5 right-5 z-[90]">
        {/* Pulsing ring, only shown while the modal hasn't been opened yet */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-60" />
        )}

        <button
          onClick={() => setIsOpen(true)}
          title="How it works"
          className="relative flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg transition hover:scale-105 hover:shadow-xl [animation-duration:2s]"
        >
          <IconQuestionMark size={22} />
        </button>
      </div>

      {/* Modal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
              >
                <IconX size={18} />
              </button>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
                  How it works
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 sm:text-base">
                  Three steps between you and a shared canvas.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="relative flex flex-col items-center rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 text-center transition hover:border-blue-200 hover:shadow-md"
                    >
                      <span className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-xs font-bold text-white">
                        {index + 1}
                      </span>

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                        <Icon size={22} />
                      </div>

                      <h3 className="mb-2 text-base font-semibold text-neutral-800 sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
