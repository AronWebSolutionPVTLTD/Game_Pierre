import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function TernaryCards() {
  const navigate = useNavigate();
  return (
    <div className="container binarycontainer">
      {/* <div className="fa-2x" onClick={()=>navigate("/setting")}><BsArrowLeftCircleFill/></div> */}
      <h1 className="fw-semibold mb-2 text-center">Ternary Card</h1>
    </div>
  );
}
