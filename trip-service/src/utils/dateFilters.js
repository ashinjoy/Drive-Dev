

export const getDailyFilters = (now) => {
  const dailyDateRange = [];
  const currentTime = new Date(now);
  const startTime = new Date(currentTime);
  startTime.setHours(0, 0, 0, 0);
  dailyDateRange.push({
    label: startTime.toLocaleString("en-US", { weekday: "long" }),
    startTime,
    endTime: currentTime,
  });

  for (let i = 1; i < 7; i++) {
    const currentDay = new Date(currentTime);
    const prevDayStart = new Date(currentDay);
    prevDayStart.setDate(prevDayStart.getDate() - i);
    prevDayStart.setHours(0, 0, 0, 0);
    const prevDayEnd = new Date(currentDay);
    prevDayEnd.setDate(prevDayEnd.getDate() - i);
    prevDayEnd.setHours(23, 59, 59, 999);
    dailyDateRange.push({
      label: prevDayStart.toLocaleString("en-US", { weekday: "long" }),
      startTime: prevDayStart,
      endTime: prevDayEnd,
    });
  }
  return dailyDateRange;
};

export const getWeeklyFilters = (now) => {
  const dailyDateRange = [];
  const currentTime = new Date(now);
  const startTime = new Date(now);
  startTime.setDate(startTime.getDate() - 7);
  startTime.setHours(0, 0, 0, 0);
  console.log("startTime", startTime);
  dailyDateRange.push({
    label: "week4",
    startTime: new Date(startTime),
    endTime: now,
  });
  for (let i = 3; i >= 1; i--) {
    const prevWeekEnd = new Date(startTime);
    prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
    prevWeekEnd.setHours(23, 59, 59);
    const prevWeekStart = new Date(prevWeekEnd);
    prevWeekStart.setDate(prevWeekStart.getDate() - 6);
    prevWeekStart.setHours(0, 0, 0, 0);
    dailyDateRange.push({
      label: `week${i}`,
      startTime: prevWeekStart,
      endTime: prevWeekEnd,
    });
    startTime.setDate(startTime.getDate() - 7);
  }
  console.log("date in week", dailyDateRange);
  return dailyDateRange
};

export const getMonthlyFilter = (now) => {
  const dailyDateRange = [];
  const currentTime = new Date(now);
  const startTime = new Date(now);
  startTime.setMonth(startTime.getMonth());
  startTime.setDate(1);
  startTime.setHours(0, 0, 0, 0);
  console.log(startTime);
  dailyDateRange.push({
    label: startTime.toLocaleString("en-US", { month: "long" }),
    startTime: new Date(startTime),
    endTime: now,
  });
  for (let i = 1; i < 12; i++) {
    const endDate = new Date(startTime);
    endDate.setDate(endDate.getDate() - 1);
    endDate.setHours(23, 59, 59);
    console.log("ednd", endDate);
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth());
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    dailyDateRange.push({
      label: startDate.toLocaleString("en-US", { month: "long" }),
      startTime: startDate,
      endTime: endDate,
    });
    startTime.setMonth(startDate.getDate());
    startTime.setMonth(startDate.getMonth());
    startTime.setHours(0, 0, 0, 0);
  }
  console.log(dailyDateRange);
  return dailyDateRange

};

export const getYearlyFilter = (now) => {
  const dailyDateRange = [];
  const currentTime = new Date(now);
  const startTime = new Date(now);
  startTime.setFullYear(startTime.getFullYear());
  startTime.setMonth(0);
  startTime.setDate(1);
  startTime.setHours(0, 0, 0, 0);
  dailyDateRange.push({
    label: startTime.toLocaleString('en-US',{year:"numeric"}),
    startTime: new Date(startTime),
    endTime: now,
  });

  for (let i = 1; i < 5; i++) {
    const endYear = new Date(startTime);
    endYear.setDate(endYear.getDate() - 1);
    endYear.setHours(23, 59, 59);
    const startYear = new Date(endYear);
    startYear.setFullYear(endYear.getFullYear());
    startYear.setMonth(0);
    startYear.setDate(1);
    startYear.setHours(0, 0, 0, 0);
    startTime.setFullYear(startYear.getFullYear());
    startTime.setMonth(0);
    startTime.setDate(1);
    startTime.setHours(0, 0, 0, 0);
    dailyDateRange.push({
      label: startYear.toLocaleString('en-US',{year:"numeric"}),
      startTime: startYear,
      endTime: endYear,
    });
  }
  console.log("skdk", dailyDateRange);
  return dailyDateRange
};
