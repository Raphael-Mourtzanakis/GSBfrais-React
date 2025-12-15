import '../styles/FraisForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';
import axios from 'axios';
import { useEffect } from 'react';

function FraisForm({type}) {
    const [idFrais, setIdFrais] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [anneeMois, setAnneeMois] = useState("");
    const [nbJustificatifs, setNbJustificatifs] = useState(0);
	const [montant, setMontant] = useState(0);
    const navigate = useNavigate();
    const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
    const {token} = useAuth();
	const [unFrais, setUnFrais] = useState(null);

	// Pré-remplir le formulaire si on modifie un frais existant
	useEffect(() => { 
		if (unFrais) { 
			setIdFrais(unFrais.id_frais);
			setMontant(unFrais.montantvalide || '');
			setAnneeMois(unFrais.anneemois);
			setNbJustificatifs(unFrais.nbjustificatifs);
		} }, [unFrais]
	);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token manquant');
            const fraisData = {
                anneemois: anneeMois,
                nbjustificatifs: parseInt(nbJustificatifs, 10),
                id_visiteur: getCurrentUser()["id_visiteur"]
            };
            const response = await axios.post(
                `${API_URL}frais/ajout`, fraisData, {headers: { Authorization: `Bearer ${token}` },}
            );
            console.log(response);
            navigate('/dashboard'); // Redirige vers /dashboard si succès
        } catch(err) {
            console.error('Erreur:', err);
            setError(err.response?.data?.message || err.message || 'Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="frais-form-container">
        <h2>Saisissez le frais</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <label>
                    <legend>Année-Mois :</legend>
                    <input
                        required
                        type="month"
                        placeholder="aaaa-mm"
                        value={anneeMois}
                        onChange={(e) => setAnneeMois(e.target.value)}
                    />
                </label>

                <label>
                    <legend>Nombre de justificatifs :</legend>
                    <input
                        required
                        type="number"
                        value={nbJustificatifs}
                        min="0"
                        onChange={(e) => {if (e.target.value >= 0) setNbJustificatifs(Math.trunc(e.target.value))}} // Changer la valeur à un entier supérieur ou égal à 0
                    />
                </label>

                <label>
                    <legend>Montant :</legend>
                    <input
                        disabled
                        type="number"
						value={montant}
                    /> €
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Enregistement...' : type}
                </button>
            </div>
        </form>
        </div>
    );
};

export default FraisForm;