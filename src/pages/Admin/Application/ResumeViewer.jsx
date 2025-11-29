// import React, { useEffect, useState } from "react";

// const ResumeViewer = () => {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Your signed Cloudinary API URL
//   const CLOUDINARY_API_URL =
//     "https://api.cloudinary.com/v1_1/dm9g4lkx8/raw/download?timestamp=1762849922&public_id=resumes%2Fwtrudjcq1aemuvc23diz.pdf&format=pdf&type=authenticated&expires_at=1762850222&signature=6bea2c9fd7d62d60266add0c465678939fbaea71&api_key=312667691859941";

//   useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         const response = await fetch(CLOUDINARY_API_URL, {
//           method: "GET",
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch PDF");
//         }

//         // Convert the PDF data to a Blob and create a local object URL
//         const blob = await response.blob();
//         const pdfBlobUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfBlobUrl);
//       } catch (err) {
//         console.error("Error fetching PDF:", err);
//         setError("Unable to load the resume PDF.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPdf();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
//         Loading resume...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-2xl font-semibold mb-4">Resume Preview</h1>

//       {pdfUrl && (
//         <embed
//           src={pdfUrl}
//           type="application/pdf"
//           width="100%"
//           height="800px"
//           style={{
//             border: "2px solid #ccc",
//             borderRadius: "10px",
//             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           }}
//         />
//       )}

//       <a
//         href={pdfUrl}
//         download="resume.pdf"
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
//       >
//         Download Resume
//       </a>
//     </div>
//   );
// };

// export default ResumeViewer;
















import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ResumeViewer = () => {
  const location = useLocation();
  const { publicid } = useParams(); // optional, if you passed /resume/:publicid
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   console.log("publicid :",publicid);
  
  // Access the URL passed in state
  const resumeSignedUrl = location.state?.resume;

//   console.log("resume:",resumeSignedUrl);
  
  useEffect(() => {
    const fetchPdf = async () => {
      if (!resumeSignedUrl) {
        setError("No resume URL found in navigation state.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(resumeSignedUrl);
        if (!response.ok) throw new Error("Failed to load resume");

        const blob = await response.blob();
        const pdfBlobUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfBlobUrl);
      } catch (err) {
        setError("Unable to load the resume PDF.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [resumeSignedUrl]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center p-4">
      {/* <h2 className="text-2xl font-semibold mb-4">Resume Viewer</h2> */}
      {pdfUrl ? (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="800px"
          className="border rounded-md shadow-md"
        />
      ) : (
        <p>No PDF found</p>
      )}
    </div>
  );
};

export default ResumeViewer;
