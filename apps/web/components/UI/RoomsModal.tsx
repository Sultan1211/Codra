"use client";
import { useState } from "react";
import {
  IconX,
  IconArrowRight,
  IconCopy,
  IconCheck,
  IconShare2,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareOpenId, setShareOpenId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = () => {
    const trimmed = slug.trim();
    if (!trimmed) return;

    const sanitizedSlug = trimmed
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!sanitizedSlug) return;
    onCreateRoom(sanitizedSlug);
    setSlug("");
  };

  const getRoomUrl = (room: Room) =>
    typeof window !== "undefined"
      ? `${window.location.origin}/canvas/${room.slug}`
      : `/canvas/${room.slug}`;

  const handleCopy = async (room: Room) => {
    try {
      await navigator.clipboard.writeText(getRoomUrl(room));
      setCopiedId(room.id);
      setTimeout(
        () => setCopiedId(current => (current === room.id ? null : current)),
        1500,
      );
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleWhatsAppShare = (room: Room) => {
    const message = `Join me on CoDraw: ${getRoomUrl(room)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    setShareOpenId(null);
  };

  const handleEmailShare = (room: Room) => {
    const subject = "Join my CoDraw room";
    const body = `Come draw with me on CoDraw: ${getRoomUrl(room)}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShareOpenId(null);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={() => {
        onClose();
        setShareOpenId(null);
      }}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h3 className="text-base font-semibold text-neutral-900">
            Your Rooms
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Create room */}
        <div className="px-6 pt-5 pb-4">
          <label className="mb-1.5 block text-xs font-medium text-neutral-500">
            Create a new room
          </label>
          <div className="flex gap-2">
            <input
              autoFocus
              value={slug}
              onChange={e => setSlug(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              placeholder="e.g. sprint-planning"
              className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
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
        <div className="max-h-72 overflow-y-auto border-t border-neutral-100 px-3 py-3">
          {rooms.length === 0 ? (
            <p className="py-6 text-center text-sm text-neutral-400">
              No rooms yet — create one above.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {rooms.map(room => (
                <li key={room.id} className="relative">
                  <div className="group flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-50">
                    <button
                      onClick={() => onSelectRoom(room)}
                      className="flex flex-1 items-center justify-between gap-2 rounded-md px-1 py-1 text-left"
                    >
                      <span className="truncate">{room.slug}</span>
                    </button>

                    {/* Copy link */}
                    <button
                      onClick={() => handleCopy(room)}
                      title="Copy room link"
                      className="shrink-0 rounded-md p-1.5 text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-700"
                    >
                      {copiedId === room.id ? (
                        <IconCheck size={16} className="text-green-600" />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </button>

                    {/* Share */}
                    <div className="relative shrink-0">
                      <button
                        onClick={() =>
                          setShareOpenId(current =>
                            current === room.id ? null : room.id,
                          )
                        }
                        title="Share room"
                        className="rounded-md p-1.5 text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-700"
                      >
                        <IconShare2 size={16} />
                      </button>

                      {shareOpenId === room.id && (
                        <div
                          className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleWhatsAppShare(room)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            <IconBrandWhatsapp
                              size={16}
                              className="text-green-600"
                            />
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleEmailShare(room)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            <IconMail size={16} className="text-blue-500" />
                            Email
                          </button>
                        </div>
                      )}
                    </div>

                    <IconArrowRight
                      size={16}
                      className="shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
                    />
                  </div>
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
