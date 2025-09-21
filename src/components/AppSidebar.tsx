import { User, FileText, Coins, Info, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import ashokaChakra from '@/assets/ashoka-chakra.png';

const sidebarItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "My Issues", url: "/my-issues", icon: FileText },
  { title: "Tokens", url: "/tokens", icon: Coins },
  { title: "About Us", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-saffron/20 text-saffron border-l-4 border-saffron font-medium" 
      : "hover:bg-accent/50 text-foreground";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <img src={ashokaChakra} alt="Government of India" className="w-8 h-8 flex-shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-primary truncate">Civic Connect</h2>
              <p className="text-xs text-muted-foreground truncate">Government of India</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) => getNavCls({ isActive: navIsActive || isActive(item.url) })}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="p-4 bg-gradient-civic rounded-lg mx-2 mb-2">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <Coins className="w-4 h-4" />
                  <span className="text-sm font-medium">Current Tokens</span>
                </div>
                <div className="text-2xl font-bold text-white">1,250</div>
                <p className="text-xs text-white/80">Earned from 15 reports</p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}