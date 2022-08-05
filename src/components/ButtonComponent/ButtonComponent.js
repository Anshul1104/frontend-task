import "./ButtonComponent.css";

const ButtonComponent = ({ title, type = 'button', className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonComponent;
