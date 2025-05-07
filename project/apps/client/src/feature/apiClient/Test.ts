import { testInstance } from "./config/Instance";

export const fetchTest = async () => {
    await testInstance.get("/");
}