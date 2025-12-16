import '../styles/FraisAdd.css'
import { useParams } from 'react-router-dom';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm'

function FraisHorsForfaitEdit() {
	const { id } = useParams();	

	//return (
	//	<div className="frais-hors-forfait-edit-page">
	//		<FraisHorsForfaitForm idFrais={id} unFraisHorsForfait={{unFraisHorsForfait}}/>
	//	</div>
	//);
}

export default FraisHorsForfaitEdit;