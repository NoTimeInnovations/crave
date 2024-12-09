async function subscribeTopic(token : string) {
    try {
      const response = await fetch( import.meta.env.VITE_FIREBASE_BACKEND_URL + '/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      console.log('Token saved:', data);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

export default subscribeTopic;