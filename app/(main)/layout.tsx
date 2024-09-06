import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen min-h-[400px] items-center justify-center bg-grayscale-10">
      <div>{children}</div>
    </main>
  );
}
