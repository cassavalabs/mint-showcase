import { Fragment, useRef } from "react";
import { SidebarMenu, Overlay } from "@cassavaland/uikits";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useStore } from "../../state/sidebar";
import { MobileMenu } from "../Menu/MobileMenu";
import { Authentication } from "../Menu/Authentication";

export default function Sidebar() {
  const activeSidebar = useStore((state) => state.activeSidebar);
  const open = useStore((state) => state.isOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const node = useRef<HTMLDivElement>();
  useOnClickOutside(node, open ? () => toggleSidebar(false) : undefined);

  return (
    <Fragment>
      <SidebarMenu isOpen={open} ref={node as any}>
        {activeSidebar === "mobileMenu" && <MobileMenu />}
        {activeSidebar === "authentication" && <Authentication />}
      </SidebarMenu>
      <Overlay show={open} />
    </Fragment>
  );
}
