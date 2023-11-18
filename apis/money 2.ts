import axios from 'axios';
const baseURL = 'https://api.tupl.store';
export async function getPayment(memberId: number) {
  try {
    const data = await axios.get(`${baseURL}/course/list`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
