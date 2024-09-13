// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BonjourPage from './pages/BonjourPage';
import './assets/styles.css';
import Login from './pages/login2/Login';
import ForgotPasswordPage from './pages/login2/ForgotPasswordPage';
import ResetPasswordPage from './pages/login2/ResetPasswordPage';
import IndexPage from './pages/fonctionnaire2/index';
import OrdreMissionPage from './pages/fonctionnaire2/OrdreMissionPage';
import RemboursementPage from './pages/fonctionnaire2/RemboursementPage';
import HistoriqueChoix from './pages/fonctionnaire2/historique_choix';
import HistRemb from './pages/fonctionnaire2/historique_remboursement';
import HistDepl from './pages/fonctionnaire2/historique_deplacement';
import Profil from './pages/fonctionnaire2/profil';
import AdminHome from './pages/admin/admin_home';
import AdminRequest from './pages/admin/manage_requests';
import AdminUser from './pages/admin/manage_users';
import AdminStat from './pages/admin/stats';
import AdminPrfl from './pages/admin/profile';
import ManagerHome from './pages/manager/index';
import ManagerDMD from './pages/manager/choixdemande';
import ManagerUser from './pages/manager/manage_users';
import ManagerHist from './pages/manager/history';
import ManagerPrfl from './pages/manager/profil';
import ManagerA from './pages/manager/1';
import ManagerRequest from './pages/manager/manage_requests';
import ComptaHome from './pages/comptabilite/service';
import ComptaM1 from './pages/comptabilite/m1';
import ComptaStats from './pages/comptabilite/statistiques';
import ComptaResultat from './pages/comptabilite/resultats';
import ComptaPrfl from './pages/comptabilite/profil';
               


function App() {
    return (
        
        <Router>
            <Routes>
                {/* firstpage*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/bonjour" element={<BonjourPage />} />
                 {/* LOGIN*/}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPasswordPage />} />
                <Route path="/reset" element={<ResetPasswordPage />} />
                 {/* FONCTIONNAIRE*/}
                <Route path="/index" element={<IndexPage />} />
                <Route path="/ordremission" element={<OrdreMissionPage />} />
                <Route path="/remboursement" element={<RemboursementPage />} />
                <Route path="/historique_choix" element={<HistoriqueChoix />} />
                <Route path="/historique_remboursement" element={<HistRemb />} />
                <Route path="/historique_deplacement" element={<HistDepl />} />
                <Route path="/profil" element={<Profil />} />
                 {/* ADMIN*/}
                <Route path="/admin_home" element={<AdminHome />} />
                <Route path="/manage_requests" element={<AdminRequest />} />
                <Route path="/manage_users" element={<AdminUser />} />
                <Route path="/stats" element={<AdminStat />} />
                <Route path="/profile" element={<AdminPrfl />} />
                {/* MANAGER*/}
                <Route path="/manager_home" element={<ManagerHome />}/>
                <Route path="/manager_choixdemande" element={<ManagerDMD />}/>
                <Route path="/manager_users" element={<ManagerUser />}/>
                <Route path="/manager_history" element={<ManagerHist />}/>
                <Route path="/manager_profil" element={<ManagerPrfl />}/>
                <Route path="/manager_1" element={<ManagerA />}/>
                <Route path="/manager_requests" element={<ManagerRequest />}/>
                {/* Comptabilite*/}
                <Route path="/compta_service" element={<ComptaHome />}/>
                <Route path="/compta_m1" element={<ComptaM1 />}/>
                <Route path="/compta_profil" element={<ComptaPrfl />}/>
                <Route path="/compta_resultats" element={<ComptaResultat />}/>
                <Route path="/compta_statistiques" element={<ComptaStats />}/>
            </Routes>
        </Router>
    );
}

export default App;
