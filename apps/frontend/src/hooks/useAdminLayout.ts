import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { LayoutDashboard, Users, Package, ShoppingCart } from "lucide-react";

export function useAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Menu items configuration
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Người dùng",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Sản phẩm",
      path: "/admin/products",
      icon: Package,
    },
    {
      label: "Đơn hàng",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Danh mục",
      path: "/admin/categories",
      icon: Package,
    },
  ];

  // Check if current path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Get current page title
  const getCurrentPageTitle = () => {
    return (
      menuItems.find((item) => isActive(item.path))?.label || "Admin Panel"
    );
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Navigate anyway vì logout clears local state
      navigate("/login");
    }
  };

  // Sidebar controls
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Menu navigation
  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return {
    // Data
    user,
    menuItems,
    currentPageTitle: getCurrentPageTitle(),

    // States
    sidebarOpen,
    sidebarCollapsed,

    // Actions
    isActive,
    handleLogout,
    toggleSidebar,
    toggleSidebarCollapse,
    handleMenuClick,
    navigate,
  };
}
