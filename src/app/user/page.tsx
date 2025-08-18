"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Brand {
  id: number;
  name: string;
  logoPath: string;
  status: string;
}

interface Branch {
  id: number;
  name: string;
  status: string;
}

interface Role {
  id: number;
  name: string;
}

interface UserMapRole {
  id: number;
  role: Role;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  status: string;
  createdAt: string;
  brand: Brand;
  branch: Branch;
  userMapRoles: UserMapRole[];
}

interface PaginationInfo {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export default function UserPage() {
  const { user } = useAuth();
  console.log(user);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 20,
    totalPages: 0,
    currentPage: 0,
  });

  const fetchUsers = async (page: number = 0, rowsPerPage: number = 20) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://posapi.7solution.net/users/admin",
        {
          params: { page: page + 1, limit: rowsPerPage }, // API uses 1-based pagination
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setUsers(response.data.data.items);
      setPagination(response.data.data.pagination);
    } catch (_) {
      toast.error("خطا در دریافت اطلاعات کاربران");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    fetchUsers(newPage, pagination.itemsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    fetchUsers(0, newRowsPerPage);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 4, boxShadow: 3, mt: 4 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                شناسه
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                نام و نام خانوادگی
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                شماره موبایل
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                ایمیل
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                برند
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                شعبه
              </TableCell>
              <TableCell>نقش</TableCell>
              <TableCell>وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={user.id}
                sx={{
                  backgroundColor: i % 2 === 0 ? "#e3f2fd" : "#fff",
                  "&:hover": { backgroundColor: "#bbdefb" },
                  transition: "background 0.2s",
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{`${user.firstName} ${
                  user?.lastName || ""
                }`}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.brand?.name || ""}</TableCell>
                <TableCell>{user.branch?.name || ""}</TableCell>
                <TableCell>
                  {user.userMapRoles
                    .map((mapRole) => mapRole.role.name)
                    .join(", ")}
                </TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={pagination.totalItems}
          page={pagination.currentPage - 1} // Convert 1-based to 0-based
          onPageChange={handleChangePage}
          rowsPerPage={pagination.itemsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد در صفحه"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`
          }
          rowsPerPageOptions={[2, 5, 10, 20, 50]}
        />
      </TableContainer>
    </Container>
  );
}
