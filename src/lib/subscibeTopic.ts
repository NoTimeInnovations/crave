async function subscribeTopic(token : string) {
    try {
      const response = await fetch( import.meta.env.VITE_FIREBASE_BACKEND_URL + '/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if(!data){
        throw new Error('Failed to turn on offer notifications');
      }
      console.log('Offer notifications turned on!');
    } catch (error) {
      console.error('Failed to turn on offer notifications', error);
    }
  }

export default subscribeTopic;