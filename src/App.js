import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import AssuranceList from './components/AssuranceList';
import AssuranceForm from './components/AssuranceForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/edit/:id" element={<ClientForm />} />
           <Route path="/assurances" element={<AssuranceList />} />
           <Route path="/" element={<AssuranceList />} />
          <Route path="/assurances/new" element={<AssuranceForm />} />
          <Route path="/assurances/edit/:id" element={<AssuranceForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
