import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-[1080px]">{children}</div>
    </main>
  );
}
