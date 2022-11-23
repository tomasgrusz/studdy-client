

const Category = ({ category, size }) => {

    const categoryColors = ['#6666', '#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FFBD', '#33EEFF', '#3388FF', '#4433FF', '#7C33FF', '#E233FF']

    const CategoryStyle = {
        height: size,
        width: size,
        backgroundColor: categoryColors[category],
        borderRadius: '50%',
        display: 'inline-block',
    }

    return (
        <span className="category-circle" style={CategoryStyle}></span>
    )
}

export default Category