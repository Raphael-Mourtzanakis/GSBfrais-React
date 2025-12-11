import '../styles/FraisForm.css'
import { useState } from 'react';

function FraisForm() {
    const [idFrais, setIdFrais] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [anneeMois, setAnneeMois] = useState("");
    const [nbJustificatifs, setNbJustificatifs] = useState(0);
    const [montant, setMontant] = useState(0.0);

    const handleSubmit = ()=>(
        alert("Formulaire soumis : \n" + anneeMois + "\n" + nbJustificatifs + "\n" + montant + " €")
    )

    return (
        <div className="frais-form-container">
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
                        required
                        type="number"
                        value={montant}
                        min="0.0"
                        step="0.25"
                        onChange={(e) => {if (e.target.value >= 0)  setMontant(e.target.value)}} // Changer la valeur à une valeur supérieure ou égale à 0
                    /> €
                </label>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Enregistrer' : 'Ajouter'}
            </button>
        </form>
        </div>
    );
};

export default FraisForm;