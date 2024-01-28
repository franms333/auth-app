export const LoginCall = async(userData:{email:string,password:string}) => {
    let requestBody = {
        query: `
          query {
            login(email:"${userData.email}", password:"${userData.password}") {
              userId
              name
              token
              tokenExpiration
            }
          }
        `
    }

    const response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'content-type': 'application/json'
      }
    })

    try {
        if(response.status !== 200 && response.status !== 201){
            throw new Error("User or Password are incorrect");
        }

        const data = await response.json();
        return {
            data
        }
    } catch (error) {
        console.log(error);
        return {
          data: error
        }
    }
}