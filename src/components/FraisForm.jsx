import '../styles/FraisForm.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';
import axios from 'axios';

function FraisForm({unFrais}) {
    const [idFrais, setIdFrais] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [anneeMois, setAnneeMois] = useState("");
    const [nbJustificatifs, setNbJustificatifs] = useState(parseInt(0));
	const [montant, setMontant] = useState(null);
    const navigate = useNavigate();
    const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
    const {token} = useAuth();

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
			const unFraisData = { 
				anneemois: anneeMois,
				nbjustificatifs: parseInt(nbJustificatifs, 10),
			};
			if (unFrais) { // Mise à jour d'un frais existant (UPDATE)
				unFraisData["id_frais"] = idFrais; // ajoute id_frais au JSON unFraisData
				unFraisData["montantvalide"] = parseFloat(montant);
				//unFraisData["id_etat"] = parseInt(idEtat); // Si il y avait l'ID de l'état dans la requête
				const response = await axios.post(
					`${API_URL}frais/modif`, 
					unFraisData, 
					{ headers: { Authorization: `Bearer ${token}` }, }
				);
				console.log(response);
			} else { // Ajout d'un nouveau frais (CREATE)
				unFraisData["id_visiteur"] = getCurrentUser()["id_visiteur"];
				const response = await axios.post(
					`${API_URL}frais/ajout`,
					unFraisData,
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

    return (
        <div className="frais-form-container">
        <h2>Saisissez les valeurs</h2>
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
                        onChange={(e) => {if (e.target.value >= 0) setNbJustificatifs(Math.trunc(parseInt(e.target.value)))}} // Changer la valeur à un entier supérieur ou égal à 0 en enlevant les chiffres après la virgule et la virgule
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
                    {loading ? 'Enregistement...' : (unFrais ? "Modifier" : "Ajouter")}
                </button>
            </div>
        </form>
        </div>
    );
};

export default FraisForm;