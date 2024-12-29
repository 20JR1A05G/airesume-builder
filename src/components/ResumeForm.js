import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const ResumeForm = ({ onChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    objective: '',
    linkedin: '',
    github: '',
    education10th: { cgpa: '', year: '', stream: '' },
    education12th: { cgpa: '', year: '', stream: '' },
    higherQualification: { cgpa: '', year: '', stream: '' },
    skills: '',
    hobbies: '',
    achievements: '',
    template: 'template1', // Default template
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('education10th')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, education10th: { ...formData.education10th, [field]: value } });
    } else if (name.startsWith('education12th')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, education12th: { ...formData.education12th, [field]: value } });
    } else if (name.startsWith('higherQualification')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, higherQualification: { ...formData.higherQualification, [field]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/generate-resume', formData);
      onSubmit(formData);
      generatePDF(formData);
    } catch (error) {
      console.error('Error generating resume:', error);
      generatePDF(formData); // Fallback to local generation if API fails
    }
  };

  const generatePDF = (resumeData) => {
    const doc = new jsPDF();

    const docOutput = () => {
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.text(resumeData.name, 105, 20, null, null, 'center');
      
      doc.setFontSize(12);
      doc.text(`Email: ${resumeData.email}`, 105, 30, null, null, 'center');
      doc.text(`Phone: ${resumeData.phone}`, 105, 35, null, null, 'center');
      doc.text(`LinkedIn: ${resumeData.linkedin}`, 105, 40, null, null, 'center');
      doc.text(`GitHub: ${resumeData.github}`, 105, 45, null, null, 'center');

      if (resumeData.photo) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const image = event.target.result;
          doc.addImage(image, 'JPEG', 160, 10, 40, 40);
          addSections();
        };
        reader.readAsDataURL(resumeData.photo);
      } else {
        addSections();
      }

      function addSections() {
        const yOffset = 60;
        doc.text(`Objective: ${resumeData.objective}`, 10, yOffset);
        
        doc.text('Education:', 10, yOffset + 10);
        doc.autoTable({
          startY: yOffset + 15,
          head: [['Level', 'CGPA', 'Year', 'Stream']],
          body: [
            ['10th Grade', resumeData.education10th.cgpa, resumeData.education10th.year, resumeData.education10th.stream],
            ['12th Grade', resumeData.education12th.cgpa, resumeData.education12th.year, resumeData.education12th.stream],
            ['Higher Qualification', resumeData.higherQualification.cgpa, resumeData.higherQualification.year, resumeData.higherQualification.stream]
          ],
          theme: 'grid'
        });

        const finalY = doc.autoTable.previous.finalY + 10;
        doc.text(`Skills: ${resumeData.skills}`, 10, finalY);
        doc.text(`Hobbies: ${resumeData.hobbies}`, 10, finalY + 10);
        doc.text(`Achievements: ${resumeData.achievements}`, 10, finalY + 20);

        doc.text(`Personal Details:`, 10, finalY + 30);
        doc.text(`Address: ${resumeData.address}`, 10, finalY + 40);
      }
      
      doc.save('resume.pdf');
    };

    if (resumeData.template === 'template1') {
      // Template 1: Simple and Clean
      doc.setFontSize(22);
      doc.text('Resume', 105, 10, null, null, 'center');
      docOutput();
    } else if (resumeData.template === 'template2') {
      // Template 2: Modern and Stylish
      doc.setFontSize(22);
      doc.setTextColor(0, 0, 128);
      doc.text('Curriculum Vitae', 105, 10, null, null, 'center');
      docOutput();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <textarea name="objective" placeholder="Objective" onChange={handleChange} required></textarea>
      <input type="url" name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} required />
      <input type="url" name="github" placeholder="GitHub URL" onChange={handleChange} required />

      <h3>10th Grade Details</h3>
      <input type="text" name="education10th.cgpa" placeholder="CGPA" onChange={handleChange} required />
      <input type="text" name="education10th.year" placeholder="Passed Out Year" onChange={handleChange} required />
      <input type="text" name="education10th.stream" placeholder="Stream of Study" onChange={handleChange} required />

      <h3>12th Grade Details</h3>
      <input type="text" name="education12th.cgpa" placeholder="CGPA" onChange={handleChange} required />
      <input type="text" name="education12th.year" placeholder="Passed Out Year" onChange={handleChange} required />
      <input type="text" name="education12th.stream" placeholder="Stream of Study" onChange={handleChange} required />

      <h3>Higher Qualification Details</h3>
      <input type="text" name="higherQualification.cgpa" placeholder="CGPA" onChange={handleChange} required />
      <input type="text" name="higherQualification.year" placeholder="Passed Out Year" onChange={handleChange} required />
      <input type="text" name="higherQualification.stream" placeholder="Stream of Study" onChange={handleChange} required />

      <textarea name="skills" placeholder="Skills" onChange={handleChange} required></textarea>
      <textarea name="hobbies" placeholder="Hobbies" onChange={handleChange} required></textarea>
      <textarea name="achievements" placeholder="Achievements" onChange={handleChange} required></textarea>
      <textarea name="certifications" placeholder="Certifications" onChange={handleChange} required></textarea>
      <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
      <select name="template" onChange={handleChange} required>
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
        {/* Add more templates as needed */}
      </select>
      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
