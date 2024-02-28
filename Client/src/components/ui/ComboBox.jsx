import Select from 'react-select';

const options = [
    { value: '1', label: 'Pendiente' },
    { value: '2', label: 'En Curso' },
    { value: '3', label: 'Finalizado' },
];

export const ComboBox = ({ selectedOption, handleChange }) => {
    return (
        <Select
            className="w-full text-sm text-gray-600 focus:outline-none focus:border-blue-500"
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Selecciona un estado"
        />
    );
};