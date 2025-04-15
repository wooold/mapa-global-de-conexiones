import '../styles/theme/components/button.css';

function ButtonHIG({ children, onClick, type = 'button' }) {
  return (
    <button className="btn-hig" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonHIG;
