import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Remplacer useHistory par useNavigate
import {getAssuranceById,updateAssurance,createAssurance} from '../services/assuranceService';

const AssuranceForm = () => {
    const [typeAssurance, setType] = useState('');
    const [montant, setMontant] = useState(0);
    const [dateDebut, setDateDebut] = useState(Date.now);
    const [dateFin, setDateFin] = useState(Date.UTC);
    const navigate = useNavigate(); // Remplacer useHistory par useNavigate
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadAssurance();
        }
    }, [id]);

    const loadAssurance = async () => {
        const result = await getAssuranceById(id);
        setType(result.data.typeAssurance);
        setMontant(result.data.montant);
        setDateDebut(result.data.dateDebut);
        setDateFin(result.data.dateFin)
    };

    const saveOrUpdateAssurance = async (e) => {
        e.preventDefault();
        const assurance = { typeAssurance, montant, dateDebut, dateFin };

        if (id) {
            await updateAssurance(id, assurance);
        } else {
            await createAssurance(assurance);
        }

        navigate('/assurances'); // Utiliser navigate pour rediriger
    };

    return (
        <div className="container">
            <h2>{id ? "Modifier l'Assurance" : "Ajouter une Assurance"}</h2>
            <form onSubmit={saveOrUpdateAssurance}>
                <div className="form-group">
                    <label>Type Assurance</label>
                    <input
                        type="text"
                        className="form-control"
                        value={typeAssurance}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Montant</label>
                    <input
                        type="text"
                        className="form-control"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date debut</label>
                    <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date fin</label>
                    <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? "Mettre à jour" : "Ajouter"}
                </button>
            </form>
        </div>
    );
};

export default AssuranceForm;
