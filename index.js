const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DEEP_LINK = 'vamobile://';

function redirect(response, url) {
  response.writeHead(302, {
    Location: url,
  });
  response.end();
}

http
  .createServer((request, response) => {
    // get parameters from request
    const parameters = url.parse(request.url, true).query;

    // if parameters contain authServiceUrl, this request comes from the application
    if (parameters.authServiceUrl) {
      // redirect user to the authUrl
      redirect(response, decodeURIComponent(parameters.authServiceUrl));
      return;
    }

    console.log(response);

    // redirect response from the auth service to your application
    redirect(response, DEEP_LINK);
  })
  .listen(PORT);