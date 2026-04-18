import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";

import "dayjs/locale/ru";

dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(duration);

dayjs.locale("ru");

export default dayjs;
