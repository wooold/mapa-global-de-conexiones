import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Mapa from './Mapa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  return (
    <div>
      <h1>Mapa Global de Conexiones</h1>
      <Mapa />
    </div>
  );
}

export default App;