"use client";
import { useState } from "react";
import { IconX, IconArrowRight } from "@tabler/icons-react";
import { createPortal } from "react-dom";

type Room = {
  id: string;
  slug: string;
};

interface RoomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onCreateRoom: (slug: string) => void;
  onSelectRoom: (room: Room) => void;
}

export default function RoomsModal({
  isOpen,
  onClose,
  rooms,
  onCreateRoom,
  onSelectRoom,
}: RoomsModalProps) {
  const [slug, setSlug] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    const trimmed = slug.trim();
  if (!trimmed) return;

  const sanitizedSlug = trimmed
    .toLowerCase()
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/[^a-z0-9-]/g, ""); // strip anything that isn't a letter, number, or hyphen

  if (!sanitizedSlug) return;
  onCreateRoom(sanitizedSlug);
  setSlug("");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl "
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h3 className="text-base font-semibold text-neutral-900 ">
            Your Rooms
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700  "
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Create room */}
        <div className="px-6 pt-5 pb-4">
          <label className="mb-1.5 block text-xs font-medium text-neutral-500 ">
            Create a new room
          </label>
          <div className="flex gap-2">
            <input
              autoFocus
              value={slug}
              onChange={e => setSlug(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              placeholder="e.g. sprint-planning"
              className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 "
            />
            <button
              onClick={handleCreate}
              disabled={!slug.trim()}
              className="shrink-0 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create
            </button>
          </div>
        </div>

        {/* Room list */}
        <div className="max-h-64 overflow-y-auto border-t border-neutral-100 px-3 py-3">
          {rooms.length === 0 ? (
            <p className="py-6 text-center text-sm text-neutral-400">
              No rooms yet — create one above.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {rooms.map(room => (
                <li key={room.id}>
                  <button
                    onClick={() => onSelectRoom(room)}
                    className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-neutral-700 transition hover:bg-neutral-50  "
                  >
                    <span className="truncate">{room.slug}</span>
                    <IconArrowRight
                      size={16}
                      className="shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
