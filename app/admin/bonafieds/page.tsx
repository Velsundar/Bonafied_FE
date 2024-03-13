"use client";
import NavBar from "../../../app/dashboard/navbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../..//app/components/MUI/Drawer/Drawer";
import PaperLayout from "../../../app/components/MUI/PaperLayout/PaperLayout";
import AdminBonafiedManagementService from "../../services/admin/Bonafied.service";
import {
  EditIcon,
  DeleteIcon,
} from "../../../app/components/MUI/Buttons/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import GetAppIcon from "@mui/icons-material/GetApp";
import DoneAllIcon from "@mui/icons-material/DoneAll";

interface CustomDataGridProps {
  rows: any[];
  columns: any[];
  pagination?: boolean;
  pageSize?: number;
  page: number;
  onPageChange: (newPage: { page: number }) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Adminbonafied = () => {
  const history = useRouter();
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [selectedBonafied, setSelectedBonafied] = useState<any>(null);
  console.log("selectedbonafied", selectedBonafied);
  console.log("userdata", userData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false); // State to manage dialog open/close
  const [approvalStatus, setApprovalStatus] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (!token || userRole !== "admin") {
      history.push("/");
    } else {
      setIsTokenPresent(true);
      setIsAdmin(true);
    }
  }, [history]);
  const getUserData = async () => {
    const response = await AdminBonafiedManagementService.getAllBonafied();
    console.log("userresponse", response);
    setUserData(response?.data?.data);
  };
  useEffect(() => {
    getUserData();
  }, []);
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = async (userId: any) => {
    try {
      const response = await AdminBonafiedManagementService.getBonafiedById(
        userId
      );
      setSelectedBonafied(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching bonafied:", error);
    }
  };
  const handleView = async (userId: any) => {
    try {
      const response = await AdminBonafiedManagementService.getBonafiedById(
        userId
      );
      setSelectedBonafied(response.data);
      setOpenViewDialog(true);
    } catch (error) {
      console.error("Error fetching bonafied by ID:", error);
    }
  };
  const handleDelete = (userId: any) => {
    // Handle delete action
    console.log("Delete user:", userId);
  };
  const handleConfirmApproval = async () => {
    try {
      const id = selectedBonafied?._id;
      const payload = { approval: true };
      await AdminBonafiedManagementService.updateBonafied(id, payload);
      setOpenDialog(false);
      setApprovalStatus(true);

      const response = await AdminBonafiedManagementService.getAllBonafied();
      setUserData(response?.data?.data);
    } catch (error) {
      console.error("Error updating bonafied:", error);
    }
  };
  const columns = [
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "regNo", headerName: "Registration Number", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "fatherName", headerName: "Father's Name", width: 180 },
    { field: "purpose", headerName: "Purpose", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <Box>
          {params.row.approval ? (
            <Tooltip title="Download" arrow>
              <IconButton>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Approve" arrow>
              <IconButton onClick={() => handleEdit(params.row._id)}>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="View" arrow>
            <IconButton onClick={() => handleView(params.row._id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton onClick={() => handleDelete(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  const mapKeyToLabel = (key: any) => {
    switch (key) {
      case "fullName":
        return "Full Name";
      case "regNo":
        return "Registration Number";
      case "department":
        return "Department";
      case "year":
        return "Year";
      case "email":
        return "Email";
      case "fatherName":
        return "Father's Name";
      case "purpose":
        return "Purpose";
      case "approval":
        return "Approval";
      default:
        return key;
    }
  };
  return (
    <Box
      style={{ display: "flex", height: "calc(100vh - 120px)", width: "100%" }}
    >
      <MiniDrawer />
      <PaperLayout
        elevation={3}
        style={{
          height: "100%",
          marginTop: "90px",
          padding: "20px",
          width: "calc(100vw - 200px)",
        }}
      >
        <Box sx={{ flexGrow: 1, padding: "2px" }}>
          <Typography variant="h6">Bonafied Applications</Typography>
          <Divider sx={{ borderBottomWidth: "5px" }} />
          <div style={{ height: 400, width: "100%", marginTop: "25px" }}>
            <DataGrid
              rows={userData}
              columns={columns}
              pageSize={rowsPerPage}
              paginationMode="server"
              page={page}
              getRowId={(row) => row._id}
              onPageChange={(newPage: any) => setPage(newPage.page)}
              onPageSizeChange={(pageSize: any) => setRowsPerPage(pageSize)}
              pagination
            />
          </div>
        </Box>
      </PaperLayout>
      {/* Dialog for approval confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmApproval}
            color="primary"
            variant="contained"
            style={{ margin: "8px", backgroundColor: "#2196f3" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
        <DialogTitle>Bonafied Information</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.entries(selectedBonafied || {}).map(
                  ([key, value]: any) =>
                    key !== "_id" &&
                    key !== "__v" && (
                      <TableRow key={key}>
                        <TableCell>{mapKeyToLabel(key)}</TableCell>
                        <TableCell
                          style={{
                            color:
                              key === "approval"
                                ? value
                                  ? "green"
                                  : "peachpuff"
                                : "inherit",
                          }}
                        >
                          {key === "approval"
                            ? value
                              ? "APPROVED"
                              : "PENDING"
                            : value}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Adminbonafied;
