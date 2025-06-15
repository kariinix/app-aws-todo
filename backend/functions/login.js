const { Issuer } = require("openid-client");

exports.handler = async () => {
  const { COGNITO_ISSUER_URL, COGNITO_CLIENT_ID, REDIRECT_URI_CALLBACK } = process.env;
  const issuer = await Issuer.discover(COGNITO_ISSUER_URL);
  const client = new issuer.Client({ client_id: COGNITO_CLIENT_ID });

  const url = client.authorizationUrl({
    redirect_uri: REDIRECT_URI_CALLBACK,
    scope: "openid email profile",
    response_type: "code"
  });

  return {
    statusCode: 302,
    headers: { Location: url }
  };
};