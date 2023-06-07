function NavButton({ hidden = '', label }) {
  return (
    <button
      onClick={() => console.log('Click')}
      className="px-4 py-2 space-x-3 text-sm transition-colors duration-300 transform border rounded-lg text-gray-200 border-gray-200 hover:bg-gray-700 focus:outline-none"
    >
      {hidden && <span className="lg:hidden xl:inline">{hidden} </span>}
      {label}
    </button>
  );
}

export default NavButton;
