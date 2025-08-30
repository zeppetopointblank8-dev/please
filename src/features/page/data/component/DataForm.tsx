"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/features/components/ui/dialog";
import { Input } from "@/features/components/ui/input";
import { Button } from "@/features/components/ui/button";
import { Label } from "@/features/components/ui/label";
import { Plus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/features/components/ui/select";
import { createData, updateData } from "@/auctions/feature/data-management";
import { useToastCustom } from "@/features/components/ui/toast-provider";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

interface DataFormProps {
  onAddUser: (user: Omit<User, 'id' | 'lastLogin'>) => void;
  editUser?: User | null;
  onEditUser?: (user: User) => void;
  onCancelEdit?: () => void;
}

export default function DataForm({ onAddUser, editUser, onEditUser, onCancelEdit }: DataFormProps) {
  const { addToast } = useToastCustom();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  // kalau editUser ada, isi form dan buka modal
  useEffect(() => {
    if (editUser) {
      setForm({
        name: editUser.name,
        email: editUser.email,
        password: "",
        role: editUser.role,
        status: editUser.status
      });
      setIsOpen(true);
    }
  }, [editUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "",
      status: ""
    });
    setIsOpen(false);
    if (onCancelEdit) onCancelEdit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (editUser && onEditUser) {
        const response = await updateData({
          id: editUser.id,
          name: form.name,
          email: form.email,
          password: form.password || undefined,
          role_id: form.role === "admin" ? 1 : 2,
          status: form.status
        });
        
        if (response.success) {
          onEditUser({
            ...editUser,
            name: form.name,
            email: form.email,
            role: form.role,
            status: form.status
          });
          addToast({
            title: "Berhasil!",
            description: `User ${form.name} berhasil diupdate.`,
            variant: "success"
          });
        } else {
          addToast({
            title: "Gagal update user!",
            description: response.message || "Terjadi kesalahan saat mengupdate user.",
            variant: "destructive"
          });
          return;
        }
      } else {
        const response = await createData({
          name: form.name,
          email: form.email,
          password: form.password,
          role_id: form.role === "admin" ? 1 : 2,
          status: form.status
        });
        
        if (response.success) {
          onAddUser({
            name: form.name,
            email: form.email,
            role: form.role,
            status: form.status
          });
          addToast({
            title: "Berhasil!",
            description: `User ${form.name} berhasil ditambahkan.`,
            variant: "success"
          });
          handleCancel();
        } else {
          addToast({
            title: "Gagal menambah user!",
            description: response.message || "Terjadi kesalahan saat menambahkan user.",
            variant: "destructive"
          });
          return;
        }
      }
      
    } catch (err) {
      console.error("Error saving user:", err);
      addToast({
        title: "Terjadi kesalahan!",
        description: "Gagal menyimpan data user. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>
            {editUser ? 'Edit Account' : 'Create New Account'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required={!editUser}
              placeholder={editUser ? "biarkan kosong untuk tidak mengubah password" : ""}
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select onValueChange={(value) => handleSelect("role", value)} value={form.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select onValueChange={(value) => handleSelect("status", value)} value={form.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium border border-blue-700"
            >
              {editUser ? 'Update Account' : 'Create Account'}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium border border-red-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
