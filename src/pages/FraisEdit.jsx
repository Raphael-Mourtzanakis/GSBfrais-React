import '../styles/FraisAdd.css'
import FraisForm from '../components/FraisForm'

function FraisEdit() {
  return (
    <div className="frais-add-page">
      <h1 className="centered">Modification de frais</h1>
      <FraisForm type="Modifier"/>
    </div>
  );
}

export default FraisEdit;