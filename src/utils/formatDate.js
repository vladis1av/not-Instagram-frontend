import formatDistance from 'date-fns/formatDistance';
import ruLang from 'date-fns/locale/ru';

const formatDate = (date) => {
  return formatDistance(date, new Date(), { locale: ruLang, addSuffix: true });
};

export default formatDate;
