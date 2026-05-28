import { useNavigate } from "react-router-dom";
import "./SelectRole.css";

import student from "../assets/student.png";
import faculty from "../assets/faculty.png";
import visitor from "../assets/visitor.png";
import admin from "../assets/admin.png";

function SelectRole() {

const navigate = useNavigate();

return (

<div className="rolePage">

<h1 className="pageTitle">
MAARGAM
</h1>


<div className="titleUnderline"></div>

<p className="tagLine">
Navigate Smarter, Reach Faster
</p>

<p className="description">
Seamlessly move through the campus with optimized routes and interactive guidance.
</p>

<div className="roleContainer">

{/* Student */}

<div
className="roleCard"
onClick={() => navigate("/student")}
>

<img
src={student}
alt="Student"
className="roleImage"
/>

<h2>Student</h2>

</div>


{/* Faculty */}

<div
className="roleCard"
onClick={() => navigate("/faculty")}
>

<img
src={faculty}
alt="Faculty"
className="roleImage"
/>

<h2>Faculty</h2>

</div>


{/* Visitor */}

<div
className="roleCard"
onClick={() => navigate("/visitor")}
>

<img
src={visitor}
alt="Visitor"
className="roleImage"
/>

<h2>Visitor</h2>

</div>


{/* Admin */}

<div
className="roleCard"
onClick={() => navigate("/admin")}
>

<img
src={admin}
alt="Admin"
className="roleImage"
/>

<h2>Admin</h2>

</div>

</div>

</div>

);

}

export default SelectRole;