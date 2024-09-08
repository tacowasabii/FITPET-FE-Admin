"use client";

import ROUTES from "@constants/path";
import {
  DocumentationIcon,
  LinkIcon,
  MessageIcon,
  SettingBigIcon,
} from "@public/svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  if (pathname === ROUTES.HOME) {
    return null;
  }
  return (
    <aside className="flex w-60 flex-col">
      <Image
        alt="sc_logo"
        src="/assets/sc_logo.webp"
        className="my-8 self-center"
        width={156}
        height={40}
      />
      <nav>
        <ul className="space-y-2 text-md font-medium text-grayscale-60">
          <li
            className={`flex w-full gap-2 rounded-r-[100px] py-3 pl-8 pr-4 ${pathname === ROUTES.QUOTE_INQUIRIES ? "bg-primary-00 text-primary-60" : "hover:bg-grayscale-05 hover:text-grayscale-90"}`}
          >
            <Link
              href={ROUTES.QUOTE_INQUIRIES}
              className="flex h-full w-full items-center gap-2"
            >
              <MessageIcon />
              <div>견적 문의</div>
            </Link>
          </li>
          <li
            className={`flex w-full gap-2 rounded-r-[100px] py-3 pl-8 pr-4 ${pathname === ROUTES.INSURANCE ? "bg-primary-00 text-primary-60" : "hover:bg-grayscale-05 hover:text-grayscale-90"}`}
          >
            <Link
              href={ROUTES.INSURANCE}
              className="flex h-full w-full items-center gap-2"
            >
              <DocumentationIcon />
              <div>보험 상품 정보</div>
            </Link>
          </li>
          <li
            className={`flex w-full gap-2 rounded-r-[100px] py-3 pl-8 pr-4 ${pathname === ROUTES.URL_MANAGEMENT ? "bg-primary-00 text-primary-60" : "hover:bg-grayscale-05 hover:text-grayscale-90"}`}
          >
            <Link
              href={ROUTES.URL_MANAGEMENT}
              className="flex h-full w-full items-center gap-2"
            >
              <LinkIcon />
              <div>URL 관리</div>
            </Link>
          </li>
          <li
            className={`flex w-full gap-2 rounded-r-[100px] py-3 pl-8 pr-4 ${pathname === ROUTES.INQUIRIES || pathname === ROUTES.PARTNERSHIP ? "bg-primary-00 text-primary-60" : "hover:bg-grayscale-05 hover:text-grayscale-90"}`}
          >
            <Link
              href={ROUTES.INQUIRIES}
              className="flex h-full w-full items-center gap-2"
            >
              <SettingBigIcon />
              <div>컨텐츠 관리</div>
            </Link>
          </li>
        </ul>
        <ul className="mt-3 space-y-3 text-sm font-semibold text-grayscale-50">
          <li>
            <Link
              href={ROUTES.INQUIRIES}
              className={`ml-20 hover:text-grayscale-80 ${pathname === ROUTES.INQUIRIES && "text-grayscale-80"}`}
            >
              1:1 문의
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES.PARTNERSHIP}
              className={`ml-20 hover:text-grayscale-80 ${pathname === ROUTES.PARTNERSHIP && "text-grayscale-80"}`}
            >
              제휴제안
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
