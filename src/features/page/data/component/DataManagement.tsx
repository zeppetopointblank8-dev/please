"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card";
import { useToastCustom } from "@/features/components/ui/toast-provider";
import { deleteData, getUsers } from "@/auctions/feature/data-management";

import DataTable, { User } from "./DataTable";
import DataForm from "./DataForm";
import DataHeader from "./DataHeader";

export default function DataManagement() {
  const { addToast } = useToastCustom();
  const [data, setData] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil data user dari API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsers({ page: 1, page_size: 100 });

      if (response.success && response.data) {
        const transformedData: User[] = response.data.items.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role_id === 2 ? "admin" : "user",
          status: user.status
        }));
        setData(transformedData);
      } else {
        addToast({
          title: "Gagal memuat data!",
          description: (response as any).message ?? "Terjadi kesalahan saat memuat data user.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      addToast({
        title: "Terjadi kesalahan!",
        description: "Gagal memuat data user. Silakan refresh halaman.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = () => fetchUsers();
  const handleEditUser = () => {
    fetchUsers();
    setEditingUser(null);
  };

  const handleDeleteUser = async (id: number) => {
    const userToDelete = data.find(user => user.id === id);

    try {
      const response = await deleteData(id);

      if (response.success) {
        setData(prev => prev.filter(user => user.id !== id)); // ⬅ langsung update state
        addToast({
          title: "Berhasil!",
          description: `User ${userToDelete?.name ?? ""} berhasil dihapus.`,
          variant: "success"
        });
      } else {
        addToast({
          title: "Gagal menghapus user!",
          description: response.message ?? "Terjadi kesalahan saat menghapus user.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      addToast({
        title: "Terjadi kesalahan!",
        description: "Gagal menghapus user. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DataHeader total={0} active={0} />
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Load Data</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DataHeader
        total={data.length}
        active={data.filter(u => u.status === "active").length}
      />
      <div className="flex justify-between items-center">
        <DataForm
          onAddUser={handleAddUser}
          editUser={editingUser}
          onEditUser={handleEditUser}
          onCancelEdit={() => setEditingUser(null)}
        />
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data}
            onDeleteUser={handleDeleteUser}
            onEditUser={setEditingUser}
          />
        </CardContent>
      </Card>
    </div>
  );
}
