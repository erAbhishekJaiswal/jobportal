import React,{useEffect, useState} from 'react';
import '../../CSSFiles/Students/MyApplications.css';
const BasseUrl = import.meta.env.VITE_BASE_URL;

const MyApplications = () => {
    

//  const applicationsData = {
//     "success": true,
//     "count": 1,
//     "applications": [
//       {
//         "_id": "692589d3fc96173a5daa5a75",
//         "job": "690c8257db76c81256f98b52",
//         "fullName": "goal",
//         "email": "goal@gmail.com",
//         "phone": "12345676543",
//         "status": "Submitted",
//         "createdAt": "2025-11-25T10:49:55.109Z",
//         "updatedAt": "2025-11-25T10:49:55.109Z"
//       }
//     ]
//   };

  const [applicationsData, setApplicationsData] = useState();
  const email = sessionStorage.getItem("email");
  const fetchApplications = async () => {
    try {
      const response = await fetch(`${BasseUrl}/applications/email/${encodeURIComponent(email)}`);
      const data = await response.json();
      setApplicationsData(data);
      console.log(data);
      
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const { success, count, applications } = applicationsData || {};

  if (!success || !applications || applications.length === 0) {
    return (
      <div className="applications-container applications-empty-state">
        <div className="applications-empty-icon">📄</div>
        <h3 className="applications-empty-title">No Applications Found</h3>
        <p className="applications-empty-description">
          You haven't submitted any job applications yet.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      Applied : {class: 'applications-status-submitted', label:'Applied'},
      Submitted: { class: 'applications-status-submitted', label: 'Submitted' },
      Reviewed: { class: 'applications-status-reviewed', label: 'Reviewed' },
      Interview: { class: 'applications-status-interview', label: 'Interview' },
      Rejected: { class: 'applications-status-rejected', label: 'Rejected' },
      Accepted: { class: 'applications-status-accepted', label: 'Accepted' }
    };

    const config = statusConfig[status] || statusConfig.Submitted;
    
    return (
      <span className={`applications-status-badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1 className="applications-title">My Applications</h1>
        <div className="applications-count">
          {count} Application{count !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="applications-table-container">
        <table className="applications-table">
          <thead className="applications-table-header">
            <tr>
              <th className="applications-th applications-th-job">Job Position</th>
              <th className="applications-th applications-th-name">Full Name</th>
              <th className="applications-th applications-th-email">Email</th>
              <th className="applications-th applications-th-phone">Phone</th>
              <th className="applications-th applications-th-status">Status</th>
              <th className="applications-th applications-th-date">Applied Date</th>
            </tr>
          </thead>
          <tbody className="applications-table-body">
            {applications.map((application) => (
              <tr key={application._id} className="applications-table-row">
                <td className="applications-td applications-td-job">
                  <div className="applications-job-info">
                    <span className="applications-job-title">{application?.job?.title}</span>
                    <span className="applications-company">{application?.job?.company?.name}</span>
                  </div>
                </td>
                <td className="applications-td applications-td-name">
                  {application.fullName}
                </td>
                <td className="applications-td applications-td-email">
                  {application.email}
                </td>
                <td className="applications-td applications-td-phone">
                  {application.phone}
                </td>
                <td className="applications-td applications-td-status">
                  {getStatusBadge(application.status)}
                </td>
                <td className="applications-td applications-td-date">
                  {formatDate(application.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;