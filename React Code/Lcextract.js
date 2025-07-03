// src/components/LivingCertificateExtractor.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LivingCertificateExtractor() {
  const navigate = useNavigate();
  const [lcFile, setLcFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState('idle');

  const onFileChange = e => {
    setLcFile(e.target.files[0]);
    setResult(null);
    setPhase('idle');
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!lcFile) {
      return setResult(null);
    }
    setLoading(true);
    setResult(null);

    const body = new FormData();
    body.append('image', lcFile);

    try {
      const res = await fetch('/api/living-certificate-extract', {
        method: 'POST',
        body
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Extraction failed');
      setResult(json);
      sessionStorage.setItem('lc_result', JSON.stringify(json));
      setPhase('idle');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartFill = () => {
    setPhase('loading');
    setTimeout(() => setPhase('ready'), 4000);
  };

  const handleFillForm = () => {
    // get or init your main form data object
    const formData = JSON.parse(sessionStorage.getItem('form_data') || '{}');
    formData.caste = result?.caste || '';
    sessionStorage.setItem('form_data', JSON.stringify(formData));

    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Living Certificate OCR</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Upload Certificate Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={onFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Extracting…' : 'Extract Text'}
        </button>
      </form>

      {result && (
        <>
          <div className="mt-4">
            <h5>Raw Extracted Text</h5>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '4px'
              }}
            >
              {result.raw_text}
            </pre>
          </div>
          <div className="mt-4">
            <h5>Parsed Fields</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>UID (Aadhaar):</strong> {result.uid || '—'}
              </li>
              <li className="list-group-item">
                <strong>Candidate Name:</strong> {result.candidate_name || '—'}
              </li>
              <li className="list-group-item">
                <strong>Mother’s Name:</strong> {result.mother_name || '—'}
              </li>
              <li className="list-group-item">
                <strong>Caste:</strong> {result.caste || '—'}
              </li>
            </ul>

            {/* NEW: Fill & Verify sequence */}
            {phase === 'idle' && (
              <button
                className="btn btn-success mt-3"
                onClick={handleStartFill}
              >
                Fill &amp; Verify
              </button>
            )}
            {phase === 'loading' && (
              <button
                className="btn btn-success mt-3 loading"
                disabled
              >
                Processing…
              </button>
            )}
            {phase === 'ready' && (
              <button
                className="btn btn-success mt-3"
                onClick={handleFillForm}
              >
                Fill Form
              </button>
            )}
          </div>
        </>
      )}

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate('/')}
      >
        Back
      </button>
    </div>
  );
}
