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
