export const SignupCall = async(userData:{name:string,email:string,password:string}) => {
    let requestBody = {
        query: `
        mutation {
            createUser(userInput:{name:"${userData.name}",email:"${userData.email}", password:"${userData.password}"}) {
              name
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
            throw new Error("An error ocurred please try later");
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