export const ageCalculator = (members) => {
  const result = [];

  members
    .sort((aObj, bObj) => {
      const a = aObj.birthday;
      const b = bObj.birthday;

      if (b === undefined) {
        return -1;
      } else if (a === undefined) {
        return 1;
      } else {
        const aDate = new Date(a.year, a.month - 1, a.day);
        const bDate = new Date(b.year, b.month - 1, b.day);

        return aDate - bDate;
      }
    })
    .forEach((member) => {
      const { name, birthday, startDate } = member;

      if (birthday === undefined) {
        result.push({ name, status: "Tell me his/her birthday!" });
        return;
      } else {
        const { year, month, day } = birthday;
        const { year: joinYear, month: joinMonth, day: joinDay } = startDate;

        const birthdayDate = new Date(year, month - 1, day);
        const joiningDate = new Date(joinYear, joinMonth - 1, joinDay);

        const turningPoint = new Date(2020, 7 - 1, 1);

        let maxAge;

        if (joiningDate - turningPoint > 0) {
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
          result.push({ name, status: "has graduated." });
          return;
        } else if (fiveYearLater - maxDate > 0) {
          result.push({
            name,
            status:
              "will graduate and finish his/her membership as active member of the hub on " +
              convertDateToLocal(maxDate) +
              ".",
          });
          return;
        } else {
          result.push({
            name,
            status:
              "will graduate on " +
              convertDateToLocal(fiveYearLater) +
              ", but can stay as active member of the hub until " +
              convertDateToLocal(maxDate) +
              ".",
          });
          return;
        }
      }
    });

  return result;
};

function convertDateToLocal(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  //   return year + "年" + month + "月" + day + "日";
  const thisDay = new Date(year, month, day);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return thisDay.toLocaleDateString("en-US", options);
}
