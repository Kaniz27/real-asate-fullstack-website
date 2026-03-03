





import Navbar from "../components/Navbar";



export default function HomePage({children}) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}