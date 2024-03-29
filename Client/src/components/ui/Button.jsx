export function Button({ onClick, children }) {
    return (
      <button
        className="w-full bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300 font-medium"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }