import { InputProps } from './input.types';

export const Input = ({ error, label, className = '', ...props }: InputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}; 