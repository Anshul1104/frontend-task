import './LoaderComponent.css';

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center loader-section">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoaderComponent;