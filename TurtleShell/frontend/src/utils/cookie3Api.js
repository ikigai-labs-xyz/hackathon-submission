import { turtleAddress } from "./address";

class Cookie3API {

    data = turtleAddress;
    
    async fetchData() {
      try {
        const response = await fetch('https://api.public.cookie3.co/swagger/v1/swagger.json');
        
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        
        const data = await response.json();
        
        // Process the retrieved data here
        this.handleData(data);
        
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    
    handleData(data) {
      // Handle the retrieved data here
      console.log(data);
    }
  }
  
  // Usage
  const cookie3API = new Cookie3API();
  cookie3API.fetchData();
  