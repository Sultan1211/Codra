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

export function NavbarDemo() {
  const router = useRouter();
  const { isLoggedIn, onRoomCreate } = useLoginContext();
  console.log(isLoggedIn, "is it ");

  useEffect(() => {}, []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([{ id: "1", slug: "hi-there" }]);

  async function handleCreate(slug: string) {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${HTTP_BACKEND}/room`,
      { slug },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    onRoomCreate(slug);
    const newRoom = { id: crypto.randomUUID(), slug: slug };
    setRooms(prev => [...prev, newRoom]);
  }
  const handleSelectRoom = (room: { id: string; slug: string }) => {
    setIsModalOpen(false);
    router.push(`/canvas/${room.slug}`);
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
            <div className="flex w-full flex-col gap-4">
              <SketchButton>Login</SketchButton>
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
