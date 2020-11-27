const formatZero = (num: number) => {
  return num > 9 ? num : `0${num}`;
};

const getDayName = (num: number): string | Error => {
  switch (num) {
    case 0: {
      return "Sun";
    }
    case 1: {
      return "Mon";
    }
    case 2: {
      return "Tue";
    }
    case 3: {
      return "Wed";
    }
    case 4: {
      return "Thu";
    }
    case 5: {
      return "Fri";
    }
    case 6: {
      return "Sat";
    }

    default: {
      throw new Error("Day doesnt exist");
    }
  }
};

const getMonthName = (num: number): string | Error => {
  switch (num) {
    case 0: {
      return "Jan";
    }
    case 1: {
      return "Feb";
    }
    case 2: {
      return "Mar";
    }
    case 3: {
      return "Apr";
    }
    case 4: {
      return "May";
    }
    case 5: {
      return "Jun";
    }
    case 6: {
      return "Jul";
    }

    case 7: {
      return "Aug";
    }
    case 8: {
      return "Sep";
    }
    case 9: {
      return "Oct";
    }
    case 10: {
      return "Nov";
    }
    case 11: {
      return "Dec";
    }

    default: {
      throw new Error("Month doesnt exist");
    }
  }
};

export const formatDate = (date: string): string | Error => {
  //TODO get date from server(store)
  const now = new Date();
  const before = new Date(date);
  const timeDifference = now.getTime() - before.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  if (dayDifference <= 1) {
    return `${formatZero(before.getHours())}:${formatZero(
      before.getMinutes()
    )}`;
  }

  if (dayDifference <= 7) {
    return getDayName(before.getDay());
  }

  if (now.getFullYear() - before.getFullYear() > 0) {
    return `${before.getDate()}.${
      before.getMonth() + 1
    }.${before.getFullYear()}`;
  }

  return `${before.getDate()} ${getMonthName(before.getMonth())}`;
};
