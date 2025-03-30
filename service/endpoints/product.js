import apiCall from '..';

const ProductService = () => {
    const ProductList = async (sendData) => {
        try {
            const queryString = new URLSearchParams(sendData).toString();
            const url = `/Products/List?${queryString}`;
            const data = await apiCall({
                url: url, method: 'POST', data: sendData
            });
            return data?.data;
        } catch (error) {
            console.error('bir hata oluştu:', error);
            return error
        }
    }
    const CategoryList = async () => {
        try {
            const url = `/Categories`;
            const data = await apiCall({
                url: url, method: 'GET'
            });
            return data?.data;
        } catch (error) {
            console.error('bir hata oluştu:', error);
            return error
        }
    }
    return { ProductList, CategoryList }
}
export default ProductService