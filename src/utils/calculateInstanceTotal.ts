import { InstanceData } from "../types/types";

export const calculateInstanceTotal = (data: InstanceData) => {
  return data.front + data.back + data.db;
};
