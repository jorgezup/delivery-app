import moment from 'moment/moment';

const formatDate = (date) => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
const formatPrice = (price) => price?.toString().replace('.', ',');
const formatToUpperCase = (string) => string?.toUpperCase();

export { formatDate, formatPrice, formatToUpperCase };
