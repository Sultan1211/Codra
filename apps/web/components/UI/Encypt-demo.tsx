import React from "react";
import { EncryptedText } from "./Encrypted-text";

export function EncryptedTextDemoSecond() {
  return (
    <p className="mx-auto max-w-lg py-3 text-center text-2xl">
      <EncryptedText
        text="Where teams plan and build together"
        encryptedClassName="text-neutral-500"
        revealedClassName="dark:text-slate-500 text-slate-500"
        revealDelayMs={50}
      />
    </p>
  );
}
