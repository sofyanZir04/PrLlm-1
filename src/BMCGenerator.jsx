import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTasks, faLightbulb, faHandshake, faRocket, faCogs, faBullhorn, faChartPie, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const BMCGenerator = ({ bmcData }) => {
  const bmcContainerRef = useRef(null);
  
  

  const downloadAsPDF = () => {
    const element = bmcContainerRef.current;
    const options = {
      margin: 0.5,
      filename: 'BusinessModelCanvas.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
  };

  const renderBMCData = () => {
    const icons = {
      keyPartners: faHandshake,
      keyActivities: faTasks,
      valueProposition: faLightbulb,
      customerRelationships: faUsers,
      customerSegments: faRocket,
      keyResources: faCogs,
      channels: faBullhorn,
      costStructure: faChartPie,
      revenueStreams: faDollarSign
    };

    return Object.keys(bmcData).map((section) => {
      const hasContent = bmcData[section].keyElements && bmcData[section].keyElements.length > 0;
      if (!hasContent) return null;

      // Concatenating key elements into a single paragraph
      const paragraph = bmcData[section].keyElements.join('. ') + '.';

      return (
        <div className="bmc-section" key={section} style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FontAwesomeIcon icon={icons[section]} style={styles.icon} /> {formatSectionTitle(section)}
          </h3>
          <p style={styles.paragraph}>
            <strong>{bmcData[section].explanation}</strong> {paragraph}
          </p>
        </div>
      );
    });
  };

  const formatSectionTitle = (title) => {
    return title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div style={styles.container}>
      <h1>Business Model Canvas</h1>
      <div id="bmc-container" ref={bmcContainerRef} style={styles.bmcContainer}>
        {renderBMCData()}
      </div>
      <button onClick={downloadAsPDF} style={styles.button}>
        Download as PDF
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  bmcContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  section: {
    marginBottom: '20px',
    pageBreakInside: 'avoid', // Prevent page breaks inside sections
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.8', // Increased line height for better readability
  },
  icon: {
    marginRight: '10px',
    color: '#4CAF50',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BMCGenerator;
