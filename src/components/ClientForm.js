import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getClientById, createClient, updateClient } from '../services/clientService';

const ClientForm = () => {
  const [initialValues, setInitialValues] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    email: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  const loadClient = async () => {
    const result = await getClientById(id);
    setInitialValues(result.data);
  };

  const validationSchema = Yup.object({
    nom: Yup.string().required('Le nom est obligatoire'),
    prenom: Yup.string().required('Le prénom est obligatoire'),
    adresse: Yup.string().required('L’adresse est obligatoire'),
    telephone: Yup.string().required('Le téléphone est obligatoire'),
    email: Yup.string().email('Email invalide').required('L’email est obligatoire')
  });

  const handleSubmit = async (values) => {
    if (id) {
      await updateClient(id, values);
    } else {
      await createClient(values);
    }
    navigate('/clients');
  };

  return (
    <div>
      <h2>{id ? 'Modifier Client' : 'Ajouter Client'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Nom</label>
              <Field name="nom" type="text" />
              <ErrorMessage name="nom" component="div" />
            </div>
            <div>
              <label>Prénom</label>
              <Field name="prenom" type="text" />
              <ErrorMessage name="prenom" component="div" />
            </div>
            <div>
              <label>Adresse</label>
              <Field name="adresse" type="text" />
              <ErrorMessage name="adresse" component="div" />
            </div>
            <div>
              <label>Téléphone</label>
              <Field name="telephone" type="text" />
              <ErrorMessage name="telephone" component="div" />
            </div>
            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <button type="submit">Soumettre</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClientForm;
