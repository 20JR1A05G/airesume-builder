import React from "react";
const ResumePreview = ({ resumeData = {} }) => {
  const {
    name = '',
    email = '',
    phone = '',
    address = '',
    objective = '',
    linkedin = '',
    github = '',
    education10th = { cgpa: '', year: '', stream: '' },
    education12th = { cgpa: '', year: '', stream: '' },
    higherQualification = { cgpa: '', year: '', stream: '' },
    skills = '',
    hobbies = '',
    achievements = '',
    certifications='',
    photo = null,
  } = resumeData;

  return (
    <div className="resume-preview">
      <h2>Resume Preview</h2>
      {photo && (
        <div>
          <img src={URL.createObjectURL(photo)} alt="Profile" width="100" />
        </div>
      )}
      <p><strong>{name}</strong></p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>LinkedIn: <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a></p>
      <p>GitHub: <a href={github} target="_blank" rel="noopener noreferrer">{github}</a></p>

      <h3>Objective</h3>
      <p>{objective}</p>

      <h3>Education</h3>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>CGPA</th>
            <th>Year</th>
            <th>Stream</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10th Grade</td>
            <td>{education10th.cgpa}</td>
            <td>{education10th.year}</td>
            <td>{education10th.stream}</td>
          </tr>
          <tr>
            <td>12th Grade</td>
            <td>{education12th.cgpa}</td>
            <td>{education12th.year}</td>
            <td>{education12th.stream}</td>
          </tr>
          <tr>
            <td>Higher Qualification</td>
            <td>{higherQualification.cgpa}</td>
            <td>{higherQualification.year}</td>
            <td>{higherQualification.stream}</td>
          </tr>
        </tbody>
      </table>

      <h3>Skills</h3>
      <p>{skills}</p>

      <h3>Hobbies</h3>
      <p>{hobbies}</p>

      <h3>Achievements</h3>
      <p>{achievements}</p>
      <h3>Certifications</h3>
      <p>{certifications}</p>

      <h3>Personal Details</h3>
      <p>Address: {address}</p>
    </div>
  );
};

export default ResumePreview;
