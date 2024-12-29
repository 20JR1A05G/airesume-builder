import React, { useState } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const ResumePage = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    template: 'template1',
    photo: null
  });

  return (
    <div className="resume-container">
      <div className="form-container">
        <ResumeForm onChange={setResumeData} onSubmit={setResumeData} />
      </div>
      <div className="preview-container">
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePage;
