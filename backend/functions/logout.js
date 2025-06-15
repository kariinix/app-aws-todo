exports.handler = async () => {
  const { COGNITO_ISSUER_URL, COGNITO_CLIENT_ID, FRONTEND_URL } = process.env;
  const logoutUrl = `${COGNITO_ISSUER_URL.replace('/.well-known/openid-configuration', '')}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(FRONTEND_URL)}`;
  return {
    statusCode: 302,
    headers: { Location: logoutUrl }
  };
};