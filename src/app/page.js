import Image from "next/image";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {

  const { logout } = useAuthStore();
  async function handleLogout() {
    await logout();
    router.push("/login");
  }
  return (
    <div>
      <header className="flex items-center justify-between">
        <LogOut onClick={handleLogout}/>
          <h1>All Houses</h1>
          <Button onClick={() => router.push("/super-admin/products/add")}>
            Add New House
          </Button>
        </header>
    </div>
  );
}
