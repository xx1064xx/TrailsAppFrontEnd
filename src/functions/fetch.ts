export async function getUser(token: string) {

    interface FetchData {
        firstname: string;
        lastname: string;
    }

    try {
        const response = await fetch('https://localhost:7052/api/Users/getCurrentUser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
        const data = (await response.json()) as FetchData;

        return data; 

        } catch (error) {
        console.error('Error fetching the weather data:', error);

        }
}