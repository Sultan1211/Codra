"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavToggle,
  MobileNavMenu,
  MobileNavHeader,
} from "./Navbar";
import { useEffect, useState } from "react";
import SketchButton from "./Sketch-button";
import { useRouter } from "next/navigation";
import { useLoginContext } from "../../lib/context";
import {
  IconFolderOpen,
  IconFolderOpenFilled,
  IconPlus,
} from "@tabler/icons-react";
import RoomsModal from "./RoomsModal";
import { HTTP_BACKEND } from "../../config";
import axios from "axios";

interface RoomType {
  id: string;
  slug: string;
}

export function NavbarDemo() {
  const router = useRouter();
  const { isLoggedIn, onRoomCreate } = useLoginContext();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${HTTP_BACKEND}/room`);
        const cleanRooms: RoomType[] = res.data.rooms.map((r: RoomType) => ({
          id: r.id,
          slug: r.slug,
        }));
        setRooms(cleanRooms);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  async function handleCreate(slug: string) {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${HTTP_BACKEND}/room`,
        { slug },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onRoomCreate(slug);
      const newRoom: RoomType = { id: crypto.randomUUID(), slug };
      setRooms(prev => [...prev, newRoom]);
    } catch (err) {
      console.error("Failed to create room:", err);
    }
  }
  const handleSelectRoom = (room: { id: string; slug: string }) => {
    setIsModalOpen(false);
    router.push(`/canvas/${room.slug}`);
  };

  const openRoomsModal = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <SketchButton onClick={() => setIsModalOpen(true)}>
                <div className="flex items-center gap-2">
                  Create Room
                  <span>
                    <IconPlus />
                  </span>
                </div>
              </SketchButton>
              <SketchButton onClick={() => setIsModalOpen(true)}>
                <div className="flex items-center gap-2">
                  <span>
                    <IconFolderOpen />
                  </span>
                  My Rooms
                </div>
              </SketchButton>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <SketchButton onClick={() => router.push("/signin")}>
                Login
              </SketchButton>
              <SketchButton onClick={() => router.push("/signup")}>
                Sign Up
              </SketchButton>
            </div>
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-3 sm:gap-4">
              {isLoggedIn ? (
                <>
                  <SketchButton onClick={openRoomsModal} className="w-full">
                    <div className="flex items-center justify-center gap-2">
                      Create Room
                      <span>
                        <IconPlus />
                      </span>
                    </div>
                  </SketchButton>
                  <SketchButton onClick={openRoomsModal} className="w-full">
                    <div className="flex items-center justify-center gap-2">
                      <span>
                        <IconFolderOpen />
                      </span>
                      My Rooms
                    </div>
                  </SketchButton>
                </>
              ) : (
                <>
                  <SketchButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/signin");
                    }}
                    className="w-full"
                  >
                    Login
                  </SketchButton>
                  <SketchButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/signup");
                    }}
                    className="w-full"
                  >
                    Sign Up
                  </SketchButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {isModalOpen && (
        <RoomsModal
          isOpen={isModalOpen}
          rooms={rooms}
          onCreateRoom={handleCreate}
          onClose={() => setIsModalOpen(false)}
          onSelectRoom={handleSelectRoom}
        />
      )}

      {/* Navbar */}
    </div>
  );
}
