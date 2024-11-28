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
import { DataGrid, GridActionsCellItem, GridRowsProp } from "@mui/x-data-grid";
import GetAppIcon from "@mui/icons-material/GetApp";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import jsPDF from "jspdf";
import "jspdf-autotable";
import RightLogo from "../../assets/png/logo.jpg";
import LeftLogo from "../../assets/png/SNR_LOGO.png";
import { COLLEGE_INFORMATION } from "../../../app/data/AppConst";
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: object) => jsPDF;
  }
}
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
  const [userData, setUserData] = useState<GridRowsProp>([]);
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
  /////////PDF
  const generatePDF = async (userId: string) => {
    try {
      const response = await AdminBonafiedManagementService.getBonafiedById(
        userId
      );
      const rowDataPdf = response.data;
      console.log("rowdatapdf", rowDataPdf);
      const doc = new jsPDF();

      const leftLogo = LeftLogo.src;
      const rightLogo = RightLogo.src;
      // Header
      const [collegeName, TRUST, NAAC, AFFILIATED, ISO, collegeAddress] =
        COLLEGE_INFORMATION;
      const header = `<b>${collegeName}</b>\n${TRUST}\n${NAAC}\n${AFFILIATED}\n${ISO}\n${collegeAddress}`;
      // Add left logo
      doc.addImage(leftLogo, "PNG", 10, 14, 30, 30);
      // Add right logo
      doc.addImage(
        rightLogo,
        "JPEG",
        doc.internal.pageSize.getWidth() - 40,
        17,
        30,
        20
      ); //position -  (width - 60, 5) with width 50 and height 20
      // Body
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 1;
      const endYear = currentYear;
      const academicYear = `${startYear} - ${endYear}`;
      // Body
      const title = `TO WHOMSOEVER IT MAY CONCERN`;
      const body = `Certified that ${rowDataPdf?.fullName} ${rowDataPdf?.regNo} is bonafide student of this college and studying in ${rowDataPdf?.year}\n  B.Tech ${rowDataPdf?.department} during the academic year ${academicYear} 
       
         The following expenses will occur in first,second,third, and final years of B.Tech degree course.`;
      // Tables
      // const seat=rowDataPdf.seatType
      // console.log("seat",seat)
      let tableData: { name: string; value1: string; value2: string; value3: string; value4: string }[] = [];
      if (rowDataPdf?.seatType === "Government") {
        tableData = [
            { name: "Tution Fees", value1: " 50,000.00", value2:"50,000.00", value3:"50,000.00", value4:"50,000.00" },
            { name: "Development Fee", value1: "5,000.00", value2: "5,000.00", value3: "5,000.00", value4: "5,000.00" },
            { name: "Placement & Training fees", value1:"15,000.00", value2:"15,000.00", value3:"15,000.00", value4:"15,000.00" },
            { name: "Value Added Programme Fee", value1:"25,000.00", value2:"-", value3:"-", value4:"-"},
            { name:  "One Credit Course", value1:"-", value2:"5,000.00", value3:"5,000.00", value4:"5,000.00",},
        ];
    } else if (rowDataPdf?.seatType === "Management") {
        tableData = [
            { name: "Tution", value1: " 140,000.00", value2:"140,000.00", value3:"140,000.00", value4:"140,000.00" },
            { name: "Development Fee", value1: "5,000.00", value2: "5,000.00", value3: "5,000.00", value4: "5,000.00" },
            { name: "Placement & Training fees", value1:"15,000.00", value2:"15,000.00", value3:"15,000.00", value4:"15,000.00" },
            { name: "Value Added Programme Fee", value1:"25,000.00", value2:"-", value3:"-", value4:"-"},
            { name:  "One Credit Course", value1:"-", value2:"5,000.00", value3:"5,000.00", value4:"5,000.00",},
        ];
    } else {
        tableData = [
            { name: "Tution fees", value1: " 25,000.00", value2:"25,000.00", value3:"25,000.00", value4:"25,000.00" },
            { name: "Development Fee", value1: "5,000.00", value2: "5,000.00", value3: "5,000.00", value4: "5,000.00" },
            { name: "Placement & Training fees", value1:"15,000.00", value2:"15,000.00", value3:"15,000.00", value4:"15,000.00" },
            { name: "Value Added Programme Fee", value1:"25,000.00", value2:"-", value3:"-", value4:"-"},
            { name:  "One Credit Course", value1:"-", value2:"5,000.00", value3:"5,000.00", value4:"5,000.00",},
        ];
    }
      // Calculate height of header
      const headerHeight = doc.getTextDimensions(header).h;
      // Set up PDF content
      doc.setFontSize(14);
      doc.text(collegeName, doc.internal.pageSize.getWidth() / 2, 10, {
        align: "center",
      });
      doc.setFontSize(7);
      doc.text(TRUST, doc.internal.pageSize.getWidth() / 2, 20, {
        align: "center",
      });
      doc.text(NAAC, doc.internal.pageSize.getWidth() / 2, 25, {
        align: "center",
      });
      doc.text(AFFILIATED, doc.internal.pageSize.getWidth() / 2, 30, {
        align: "center",
      });
      doc.text(ISO, doc.internal.pageSize.getWidth() / 2, 35, {
        align: "center",
      });
      doc.text(collegeAddress, doc.internal.pageSize.getWidth() / 2, 40, {
        align: "center",
      });
      doc.setFontSize(9);
      const currentDate = new Date().toLocaleDateString();
      const labeledDate = `DATE: ${currentDate}`;
      const labeledDateWidth = doc.getTextWidth(labeledDate);
      doc.text(
        labeledDate,
        doc.internal.pageSize.getWidth() - labeledDateWidth - 10,
        50,
        { align: "right" }
      );
      doc.setFontSize(15);
      const titleYPosition = headerHeight + 55;
      doc.text(title, doc.internal.pageSize.getWidth() / 2, titleYPosition, {
        align: "center",
      });
      const titleWidth = doc.getTextWidth(title);
      const titleUnderlineYPosition = titleYPosition + 1;
      doc.setLineWidth(0.5);
      doc.line(
        doc.internal.pageSize.getWidth() / 2 - titleWidth / 2,
        titleUnderlineYPosition,
        doc.internal.pageSize.getWidth() / 2 + titleWidth / 2,
        titleUnderlineYPosition
      );
      doc.setFontSize(10);
      const bodyYPosition = titleYPosition + 8;
      doc.text(body, 16, bodyYPosition);
      // Calculate startY position for the first table
      const tableYPosition = bodyYPosition + 30;
      // Draw the first table
      doc.autoTable({
        startY: tableYPosition,
        head:[["Particulars", " I Year", "II Year ", "III Year","IV Year"]],
        body: tableData.map((row) => [row.name, row.value1,row.value2, row.value3, row.value4]),
      });
      // Save PDF
      doc.save(`${rowDataPdf?.fullName}_bonafied.pdf`);
    } catch (error) {
      console.error("Error fetching bonafied:", error);
    }
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
    // { field: "department", headerName: "Department", width: 150 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    // { field: "fatherName", headerName: "Father's Name", width: 180 },
    { field: "purpose", headerName: "Purpose", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <Box>
          {params.row.approval ? (
            <Tooltip title="Download" arrow>
              <IconButton onClick={() => generatePDF(params.row._id)}>
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
          <Typography variant="h6">Bonafide Applications</Typography>
          <Divider sx={{ borderBottomWidth: "5px" }} />
          <div style={{ height: 400, width: "100%", marginTop: "25px" }}>
            <DataGrid
              rows={userData}
              columns={columns}
              // pageSize={rowsPerPage}
              paginationMode="server"
              // page={page}
              getRowId={(row) => row._id}
              // onPageChange={(newPage: any) => setPage(newPage.page)}
              // onPageSizeChange={(pageSize: any) => setRowsPerPage(pageSize)}
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
        <DialogTitle>Bonafide Information</DialogTitle>
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
