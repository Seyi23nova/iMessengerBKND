module.exports = {
    apps: [{
      name: "nodeapplication",
      script: "./index.js",
      env: {
        NODE_ENV: "production",
        MY_VARIABLE: "my_value",
        PORT: 443,
        CONNECTION_URL: "mongodb+srv://barnabas:Ikigai%40123nova@onegainovadbs.global.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000",
        ACCESS_TOKEN_PRIVATE_KEY: "ACCESS TOKEN SECRET KEY",
        REFRESH_TOKEN_PRIVATE_KEY: "REFRESH TOKEN SECRET KEY"
      }
    }]
  };
  