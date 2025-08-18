"use client";

import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface OwnerUser {
  id: number;
  mobile: string;
  firstName: string;
  lastName: string;
}

interface Brand {
  id: number;
  name: string;
  logoPath: string;
  status: string;
  createdAt: string;
  ownerUser: OwnerUser;
}

interface PaginationInfo {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export default function BrandPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 20,
    totalPages: 0,
    currentPage: 0,
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://posapi.7solution.net/brands",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBrands(response.data.data);
      } catch (error) {
        toast.error("خطا در دریافت اطلاعات برندها");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        مدیریت برندها
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شناسه</TableCell>
              <TableCell>نام برند</TableCell>
              <TableCell>وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
