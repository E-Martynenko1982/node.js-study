async function postInfo() {

  const res = await fetch("https://api.api-ninjas.com/v1/passwordgenerator?length=16", {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "X-Api-Key": "25syfZItfXeVoYeZtdhWUg==5VV8QP9tj60XOqEZ"
    },

  });
  const data = await res.json();
  console.log("data", data);

}

postInfo();