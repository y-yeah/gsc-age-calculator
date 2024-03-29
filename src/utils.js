export const ageCalculator = (members) => {
  const result = [];

  members
    .sort((aObj, bObj) => {
      const { birthday: aBirth, startDate: aStart } = aObj;
      const { birthday: bBirth, startDate: bStart } = bObj;

      if (
        !aBirth.year ||
        !aBirth.month ||
        !aBirth.day ||
        !aStart.year ||
        !aStart.month ||
        !aStart.day
      ) {
        return 1;
      } else if (
        !bBirth.year ||
        !bBirth.month ||
        !bBirth.day ||
        !bStart.year ||
        !bStart.month ||
        !bStart.day
      ) {
        return -1;
      } else {
        const aBirthday = new Date(aBirth.year, aBirth.month - 1, aBirth.day);
        const bBirthday = new Date(bBirth.year, bBirth.month - 1, bBirth.day);

        return aBirthday - bBirthday;
      }
    })
    .forEach((member) => {
      const { name, birthday, startDate } = member;

      if (!birthday.year || !birthday.month || !birthday.day) {
        result.push({
          name,
          status: "Tell me his/her birthday!",
          color: "red",
        });
        return;
      } else if (!startDate.year || !startDate.month || !startDate.day) {
        result.push({
          name,
          status: "Tell me his/her registration date!",
          color: "red",
        });
        return;
      } else {
        const { year, month, day } = birthday;
        const { year: joinYear, month: joinMonth, day: joinDay } = startDate;

        const birthdayDate = new Date(year, month - 1, day);
        const joiningDate = new Date(joinYear, joinMonth - 1, joinDay);

        // New rule since 2020/07/01
        const turningPoint = new Date(2020, 7 - 1, 1);

        let maxAge;

        if (joiningDate - turningPoint >= 0) {
          maxAge = 30;
        } else {
          maxAge = 33;
        }

        const fiveYearLater = new Date(joinYear + 5, joinMonth - 1, joinDay);
        const maxDate = new Date(
          birthdayDate.getFullYear() + maxAge,
          birthdayDate.getMonth(),
          birthdayDate.getDate()
        );

        if (new Date() - maxDate > 0) {
          result.push({ name, status: "has graduated.", color: "grey" });
          return;
        } else if (fiveYearLater - maxDate > 0) {
          result.push({
            name,
            status:
              "will graduate and finish his/her membership as active member of the hub on " +
              convertDateToLocal(maxDate) +
              ".",
            color: colorMaker(maxDate),
          });
          return;
        } else {
          let initText = "";
          if (fiveYearLater < new Date()) {
            initText = "has graduated on ";
          } else {
            initText = "will graduate on ";
          }
          result.push({
            name,
            status:
              initText +
              convertDateToLocal(fiveYearLater) +
              ", but can stay as active member of the hub until " +
              convertDateToLocal(maxDate) +
              ".",
            color: colorMaker(fiveYearLater),
          });
          return;
        }
      }
    });

  return result;
};

const convertDateToLocal = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const thisDay = new Date(year, month, day);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return thisDay.toLocaleDateString("en-US", options);
};

export const removeR = (text) => {
  if (!text) return text;

  if (text[text.length - 1] === "\r") {
    return text.slice(0, text.length - 1);
  }

  return text;
};

const colorMaker = (date) => {
  const days = (date - new Date()) / (24 * 60 * 60 * 1000);
  if (days <= 0) {
    return "mistyrose";
  }
  if (days <= 365) {
    return "gold";
  }
  return "limegreen";
};
