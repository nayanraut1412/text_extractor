import React, { useState } from 'react';
import './form.css';
import uploadGif from '../../assets//resume_search.gif'; 
import submitGif from '../../assets/submit1.gif'; 

const StudentForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        skills: '',
        linkedin: '',
        github: ''
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('pdf_doc', file);
        setUploading(true);

        try {
            const response = await fetch('https://text-extractor-v13s.onrender.com/process', {
                method: 'POST',
                body: formDataUpload,
            });
            const data = await response.json();
            
            
            setFormData({
                fullName: data.fullName || formData.fullName,
                email: data.email || formData.email,
                phone: data.phone || formData.phone,
                skills: data.skills || formData.skills,
                linkedin: data.linkedin || formData.linkedin,
                github: data.github || formData.github,
            });
            setResume(file);
        } catch (error) {
            console.error('Error processing PDF:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            console.log("Submitted Details:",formData); 
            setLoading(false);
            alert('Form submitted successfully');
        }, 2000);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Student Registration</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="d-flex mb-3">
                    <h5 className="form-label">Enter Details Manually or Upload Resume</h5>
                </div>

                {/* Manual entry fields */}
                <div className={loading || uploading ? 'blur-content' : ''}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="fullName" 
                                    name="fullName" 
                                    value={formData.fullName} 
                                    onChange={handleChange} 
                                    placeholder="Enter your full name"
                                    required={!resume}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Enter your email"
                                    required={!resume}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    id="phone" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    placeholder="Enter your phone number"
                                    required={!resume}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="skills" className="form-label">Skills</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="skills" 
                                    name="skills" 
                                    value={formData.skills} 
                                    onChange={handleChange} 
                                    placeholder="Enter your skills (e.g. Python, React)"
                                    required={!resume}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="linkedin" className="form-label">LinkedIn</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="linkedin" 
                                    name="linkedin" 
                                    value={formData.linkedin} 
                                    onChange={handleChange} 
                                    placeholder="Enter LinkedIn profile URL"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="github" className="form-label">GitHub</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="github" 
                                    name="github" 
                                    value={formData.github} 
                                    onChange={handleChange} 
                                    placeholder="Enter GitHub profile URL"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload resume option */}
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Upload Resume (optional)</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="resume" 
                        accept=".pdf" 
                        onChange={handleFileUpload} 
                    />
                    
                </div>

                {/* {uploading && <img src={uploadGif} alt="Uploading..." className=" loading-gif" />} */}

                {uploading && (
                    <div className="loading-overlay">
                    <img src={uploadGif} alt="Uploading..." className="loading-gif"  />
                    </div>
                )}

                {/* Loading Spinner */}
                {loading && !uploading && (
                    <div className="loading-overlay">
                        <img src={submitGif} alt="Submitting..." className="status-gif" />
                    </div>
                )}

                <button type="submit" className="btn btn-success" disabled={loading || uploading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
