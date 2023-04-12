export const prepareDate = (dateStr: string): string => {
  const dateObj = new Date(dateStr);
  const currentDateObj = new Date();

  const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
  const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
  const minutes = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();

  let date = `${day}.${month}.${year}`;
  const delta = Math.ceil((currentDateObj.getTime() - dateObj.getTime()) / 86400000)  

  if (
    dateObj.getDate() === currentDateObj.getDate()
    && dateObj.getMonth() === currentDateObj.getMonth()
    && dateObj.getFullYear() === currentDateObj.getFullYear()
  ) {
    date = 'Сегодня,';
  } else if (delta <= 3 && delta > 0) {

    date = `${delta} ${delta > 1 ? 'дня' : 'день'} назад,`;
  }

  return `${date} ${hours}:${minutes}`;
}

export const getStatusOrderByCode = (code: 'created' | 'pending' | 'done') => {
  const statuses = {
    created: {
      color: '#8585AD',
      text: 'Создан'
    },
    pending: {
      color: '#F2F2F3',
      text: 'Готовится'
    },
    done: {
      color: '#00CCCC',
      text: 'Выполнен'
    },
  }

  return statuses[code];
}