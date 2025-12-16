import '../styles/FraisForm.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';
import axios from 'axios';
import {Link} from 'react-router-dom';

function FraisHorsForfaitForm({idFrais, unFraisHorsForfait}) {
	const [idFraisHorsForfait, setIdFraisHorsForfait] = useState(null);
    const [date, setDate] = useState("");
    const [libelle, setLibelle] = useState("");
	const [montant, setMontant] = useState(parseFloat(0));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
    const {token} = useAuth();

	// Pré-remplir le formulaire si on modifie un frais existant
	useEffect(() => { 
		if (unFraisHorsForfait) { 
			setIdFraisHorsForfait(unFraisHorsForfait.id_fraishorsforfait);
			setDate(unFraisHorsForfait.date_fraishorsforfait);
			setLibelle(unFraisHorsForfait.lib_fraishorsforfait);
			setMontant(unFraisHorsForfait.montant_fraishorsforfait);
		} }, [unFraisHorsForfait]
	);

				unFraisHorsForfait = true; useEffect(() => { setIdFraisHorsForfait(1); }); // Simuler le fait qu'on modifie

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token manquant');
			const unFraisHorsForfaitData = { 
				date_fraishorsforfait: date,
				lib_fraishorsforfait: libelle,
				montant_fraishorsforfait: parseFloat(montant),
			};
			if (unFraisHorsForfait) { // Mise à jour d'un frais existant (UPDATE)
				unFraisHorsForfaitData["id_fraishorsforfait"] = idFraisHorsForfait; // ajoute id_fraishorsforfait au JSON unFraisHorsForfaitData
				const response = await axios.post(
					`${API_URL}fraisHF/modif`, 
					unFraisHorsForfaitData, 
					{ headers: { Authorization: `Bearer ${token}` }, }
				);
				console.log(response);
			} else { // Ajout d'un nouveau frais (CREATE)
				unFraisHorsForfaitData["id_frais"] = idFrais;
				const response = await axios.post(
					`${API_URL}fraisHF/ajout`,
					unFraisHorsForfaitData,
					{ headers: { Authorization: `Bearer ${token}` }, }
				);
				console.log(response);
			}
            navigate('/dashboard'); // Redirige vers /dashboard si succès
        } catch(error) {
            console.error('Erreur:', error);
            setError(error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    }

	if (loading) return <div className="frais-table-container chargement">Chargement des frais...</div>;

  	return (
		<div className="frais-hors-forfait-form-container">
			<h2>Saisissez les valeurs</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-container">
					<label>
						<legend>Date :</legend>
						<input
							required
							type="date"
							placeholder="jj-mm-aaaa"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</label>

					<label>
						<legend>Libellé :</legend>
						<input
							required
							type="text"
							value={libelle}
							maxLength="200"
							onChange={(e) => {if ((e.target.value).length <= 200) setLibelle(e.target.value)}} // Changer la valeur à un entier supérieur ou égal à 0 en enlevant les chiffres après la virgule et la virgule
						/>
					</label>

					<label>
						<legend>Montant :</legend>
						<input
							required
							type="number"
							value={montant}
							min="0"
							step="0.01"
							onChange={(e) => {if (e.target.value >= 0) setMontant(parseFloat(e.target.value))}} // Changer la valeur à un float supérieur ou égal à 0
						/> €
					</label>

					<button type="submit" disabled={loading}>
						{loading ? 'Enregistement...' : (unFraisHorsForfait ? "Modifier" : "Ajouter")}
					</button>
				</div>
			</form>
		</div>
	);
}

export default FraisHorsForfaitForm;