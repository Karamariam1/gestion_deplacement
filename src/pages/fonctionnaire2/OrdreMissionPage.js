import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './css/stylesordre.css';
import Header from '../../components/fonctionnaire/Header';
import Sidebar from '../../components/fonctionnaire/Sidebar';

const OrdreMissionPage = () => {
  const [user, setUser] = useState({
    name: 'Jean Dupont',
    affectation: 'Informatique',
    grade: 'Manager',
    missionId: '12345',
  });

  const [formData, setFormData] = useState({
    transport: '',
    missionLocation: '',
    missionMotif: '',
    startDate: '',
    returnDate: '',
    groupMembers: [{ name: '', affectation: '', grade: '' }],
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState({});

  const handleTransportChange = (event) => {
    setFormData({ ...formData, transport: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGroupMemberChange = (index, event) => {
    const { name, value } = event.target;
    const newGroupMembers = [...formData.groupMembers];
    newGroupMembers[index] = { ...newGroupMembers[index], [name]: value };
    setFormData({ ...formData, groupMembers: newGroupMembers });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      groupMembers: [...formData.groupMembers, { name: '', affectation: '', grade: '' }],
    });
  };

  const validateForm = () => {
    // Add form validation logic here
    return true;
  };

  const displayPreview = () => {
    if (validateForm()) {
      setPreviewData(formData);
      setPreviewVisible(true);
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`N° de Mission: ${user.missionId}`, 10, 10);
    doc.text(`Nom du Responsable: ${user.name}`, 10, 20);
    doc.text(`Affectation: ${user.affectation}`, 10, 30);
    doc.text(`Grade: ${user.grade}`, 10, 40);
    doc.text(`Lieu de la Mission: ${formData.missionLocation}`, 10, 50);
    doc.text(`Motif: ${formData.missionMotif}`, 10, 60);
    doc.text(`Date de Départ: ${formData.startDate}`, 10, 70);
    doc.text(`Date de Retour: ${formData.returnDate}`, 10, 80);
    doc.save('ordre_de_mission.pdf');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert('Formulaire soumis avec succès.');
      generatePDF();
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  return (
    <>
    <Header />
    <div className="main-container">
            <Sidebar />
        <main>
      <form id="mission-form" onSubmit={handleSubmit}>
        <h1>Ordre de Mission</h1>
        <fieldset>
          <legend>Information de Mission</legend>
          <label htmlFor="mission-id">N° de Mission</label>
          <input type="text" id="mission-id" name="mission-id" value={user.missionId} readOnly />

          <label htmlFor="respo-name">Nom du Responsable de la Mission</label>
          <input type="text" id="respo-name" name="respo-name" value={user.name} readOnly />

          <label htmlFor="respo-affectation">Affectation</label>
          <input type="text" id="respo-affectation" name="respo-affectation" value={user.affectation} readOnly />

          <label htmlFor="respo-grade">Grade</label>
          <input type="text" id="respo-grade" name="respo-grade" value={user.grade} readOnly />
        </fieldset>

        <fieldset>
          <legend>Transport</legend>
          <label htmlFor="transport">Moyen de Transport</label>
          <select id="transport" name="transport" value={formData.transport} onChange={handleTransportChange} required>
            <option value="">Sélectionner...</option>
            <option value="avion">Avion</option>
            <option value="vehicule">Véhicule de Service</option>
          </select>

          {formData.transport === 'avion' && (
            <div id="avion-details" className="transport-details">
              <label htmlFor="flight-number">N° de Vol</label>
              <input type="text" id="flight-number" name="flightNumber" value={formData.flightNumber || ''} onChange={handleInputChange} />
            </div>
          )}

          {formData.transport === 'vehicule' && (
            <div id="vehicule-details" className="transport-details">
              <label htmlFor="vehicule-marque">Marque</label>
              <input type="text" id="vehicule-marque" name="vehiculeMarque" value={formData.vehiculeMarque || ''} onChange={handleInputChange} />

              <label htmlFor="vehicule-matricule">Matricule</label>
              <input type="text" id="vehicule-matricule" name="vehiculeMatricule" value={formData.vehiculeMatricule || ''} onChange={handleInputChange} />
            </div>
          )}
        </fieldset>

        <fieldset>
          <legend>Dates et Lieu</legend>
          <label htmlFor="mission-location">Lieu de la Mission</label>
          <input type="text" id="mission-location" name="missionLocation" value={formData.missionLocation} onChange={handleInputChange} required />

          <label htmlFor="mission-motif">Motif</label>
          <textarea id="mission-motif" name="missionMotif" value={formData.missionMotif} onChange={handleInputChange} required></textarea>

          <label htmlFor="start-date">Date et Heure de Départ</label>
          <input type="datetime-local" id="start-date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />

          <label htmlFor="return-date">Date et Heure de Retour</label>
          <input type="datetime-local" id="return-date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} required />
        </fieldset>

        <fieldset>
          <legend>Informations sur le Groupe Accompagnant (si existe)</legend>
          <div id="group-members">
            {formData.groupMembers.map((member, index) => (
              <div className="member" key={index}>
                <label htmlFor={`group-name-${index + 1}`}>Nom</label>
                <input type="text" id={`group-name-${index + 1}`} name="name" value={member.name} onChange={(event) => handleGroupMemberChange(index, event)} />

                <label htmlFor={`group-affectation-${index + 1}`}>Affectation</label>
                <select id={`group-affectation-${index + 1}`} name="affectation" value={member.affectation} onChange={(event) => handleGroupMemberChange(index, event)}>
                  <option value="">Sélectionner...</option>
                  <option value="informatique">Informatique</option>
                  <option value="administration">Administration</option>
                  <option value="finances">Finances</option>
                  <option value="logistique">Logistique</option>
                </select>

                <label htmlFor={`group-grade-${index + 1}`}>Grade</label>
                <select id={`group-grade-${index + 1}`} name="grade" value={member.grade} onChange={(event) => handleGroupMemberChange(index, event)}>
                  <option value="">Sélectionner...</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="manager">Manager</option>
                  <option value="directeur">Directeur</option>
                </select>
              </div>
            ))}
          </div>
          <button type="button" onClick={addMember}>Ajouter un membre</button>
        </fieldset>

        <div className="button-container">
          <button type="button" onClick={displayPreview}>Prévisualiser</button>
          <button type="submit">Envoyer</button>
        </div>
      </form>

      {previewVisible && (
        <div id="preview-section" className="modal">
          <div className="modal-content">
            <span id="close-preview" className="close" onClick={() => setPreviewVisible(false)}>&times;</span>
            <h2>Prévisualisation de la Mission</h2>
            <div id="preview-details">
              <p><strong>N° de Mission:</strong> {user.missionId}</p>
              <p><strong>Nom du Responsable:</strong> {user.name}</p>
              <p><strong>Affectation:</strong> {user.affectation}</p>
              <p><strong>Grade:</strong> {user.grade}</p>
              <p><strong>Lieu de la Mission:</strong> {previewData.missionLocation}</p>
              <p><strong>Motif:</strong> {previewData.missionMotif}</p>
              <p><strong>Date de Départ:</strong> {previewData.startDate}</p>
              <p><strong>Date de Retour:</strong> {previewData.returnDate}</p>
              {/* Afficher les membres du groupe */}
              {previewData.groupMembers && previewData.groupMembers.length > 0 && (
                <>
                  <h3>Membres du Groupe</h3>
                  {previewData.groupMembers.map((member, index) => (
                    <div key={index}>
                      <p><strong>Nom:</strong> {member.name}</p>
                      <p><strong>Affectation:</strong> {member.affectation}</p>
                      <p><strong>Grade:</strong> {member.grade}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      </main>
    </div>

    </>
  );
};

export default OrdreMissionPage;
