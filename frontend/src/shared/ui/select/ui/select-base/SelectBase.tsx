const SelectBase: React.FC<{
    name: string,
    id: string,
    options: string[]
}> = ({ name, id, options }) => {
    return (
        <select name={name} id={id}>
            {options.map((option) => (
                <option key={option} value={option}></option>
            ))}
        </select>
    );
};

export default SelectBase;