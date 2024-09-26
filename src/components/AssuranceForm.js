import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Remplacer useHistory par useNavigate
import {getAssuranceById,updateAssurance,createAssurance} from '../services/assuranceService';

const AssuranceForm = () => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Remplacer useHistory par useNavigate
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadAssurance();
        }
    }, [id]);

    const loadAssurance = async () => {
        const result = await getAssuranceById(id);
        setNom(result.data.nom);
        setDescription(result.data.description);
    };

    const saveOrUpdateAssurance = async (e) => {
        e.preventDefault();
        const assurance = { nom, description };

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
                    <label>Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
