import '../styles/FraisAdd.css'
import FraisForm from '../components/FraisForm'

function FraisAdd() {
  return (
    <div className="frais-add-page">
      <h1 className="centered">Ajout de Frais</h1>
      <FraisForm/>
    </div>
  );
}

export default FraisAdd;