import '../styles/FraisAdd.css'
import FraisForm from '../components/FraisForm'

function FraisAdd() {
  return (
    <div className="frais-add-page">
      <h1 className="centered">Ajout de frais</h1>
      <FraisForm type="Ajouter"/>
    </div>
  );
}

export default FraisAdd;