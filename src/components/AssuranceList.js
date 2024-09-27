import React, { useEffect, useState } from 'react';
import {getAssurances, deleteAssurance_} from '../services/assuranceService';
import { Link } from 'react-router-dom';

const AssuranceList = () => {
    const [assurances, setAssurances] = useState([]);

    useEffect(() => {
        loadAssurances();
    }, []);

    const loadAssurances = async () => {
        const result = await getAssurances();
        setAssurances(result.data);
    };

    const deleteAssurance = async (id) => {
        await deleteAssurance_(id);
        loadAssurances(); // Recharger la liste après suppression
    };

    return (
        <div className="container">
            <h2 className="text-center">Liste des Assurances</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Montant</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assurances.map((assurance) => (
                        <tr key={assurance.id}>
                            <td>{assurance.id}</td>
                            <td>{assurance.typeAssurance}</td>
                            <td>{assurance.montant}</td>
                            <td>{assurance.dateDebut}</td>
                            <td>{assurance.dateFin}</td>
                            <td>
                                <Link className="btn btn-info" to={`/assurances/edit/${assurance.id}`}>
                                    Modifier
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteAssurance(assurance.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/assurances/new" className="btn btn-primary">
                Ajouter une Assurance
            </Link>
        </div>
    );
};

export default AssuranceList;
