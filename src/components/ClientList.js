import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../services/clientService';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const result = await getClients();
    setClients(result.data);
  };

  const handleDelete = async (id) => {
    await deleteClient(id);
    loadClients();
  };

  return (
    <div>
      <h2>Liste des Clients</h2>
      <Link to="/clients/new">Ajouter un nouveau client</Link>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.nom}</td>
              <td>{client.prenom}</td>
              <td>{client.adresse}</td>
              <td>{client.telephone}</td>
              <td>
                <Link to={`/clients/edit/${client.id}`}>Modifier</Link>
                <button onClick={() => handleDelete(client.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
