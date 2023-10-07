import { DateTime } from "luxon";

const getDateTime = () => {
  return DateTime.now().toLocal().setZone("Asia/Dhaka");
};
export default getDateTime;
