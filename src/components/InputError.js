const InputError = ({ children }) => {
  return (
    <p style={{ paddingBottom: 0, color: "red", fontSize: "12px" }}>
      {children}
    </p>
  );
};

export default InputError;
