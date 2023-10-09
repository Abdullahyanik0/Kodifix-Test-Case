const Button = ({ children, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-r-lg px-5 h-10 text-center"
    >
      {children}
    </button>
  );
};

export default Button;
