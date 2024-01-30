import Image from "next/image";
import Login from "./Login/page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
      <>
      <Login />
      <ToastContainer />
      </>
  );
}
