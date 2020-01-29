# IP Whitelisting on Heroku Common Runtime

This proof of concept is intended to demostrate the use of nginx (with [ngx_http_access_module](http://nginx.org/en/docs/http/ngx_http_access_module.html) & [ngx_http_realip_module](http://nginx.org/en/docs/http/ngx_http_realip_module.html)) to whitelist the IP and allow acces to trusted IP ranges (Whitelisting trusted IP ranges is the native feature of [Heroku Private Space](https://devcenter.heroku.com/articles/private-spaces#trusted-ip-ranges) but there is no such a feature in Heroku Common Runtime).

## Deploy to Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

If you are using `Deploy to Heroku` button you can skip the Heroku prerequisite steps.

## Prerequisite

**Heroku**
- Heroku Application (`heroku create -a <APP_NAME>`)
- Heroku Nginx Buildpack (`heroku buildpacks:add --index=1 https://github.com/heroku/heroku-buildpack-nginx.git -a <APP_NAME>`)
- Heroku Node.js Buildpack (`heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nodejs.git -a <APP_NAME>`)


## Current Architecture

```
        +--------+       /        +-------------+       /       +-----------------+
        |        |   +------->    |             |   +------->   |                 |
        |  USER  |                |    NGINX    |               |     EXPRESS     |
        |        |   <-------+    |             |   <-------+   |                 |
        +--------+                +-------------+               +-----------------+
                                                                  localhost:2500
```

Node.js express server will run on Heroku dyno on port `2500` (Common Runtime look for a free port between `3000-60000` for `PORT` environment variable so It's good to use static port outside of this range), nginx will use Heroku `PORT` environment variable, Request will hit the nginx first and if source IPs is within range of trusted IPs it will pass the request to express server otherwise nginx will serve 403 error page.

**Note:** This POC tested with Node.js and express server only but the same POC can be used with other languages and frameworks as well.

## Usage

Add Trusted IP ranges in [config/trusted-ips.conf](https://github.com/dhavalthakkar93/Heroku-Common-Runtime-IP-Whitelisting-POC/blob/master/config/trusted-ips.conf) file. (Supports IPv4 and IPv6).

If you want to customize nginx 403 error page you can check [this](https://www.cyberciti.biz/faq/howto-nginx-customizing-404-403-error-page/) article.

## Disclaimer
This POC designed based on knowledge and expertise we holds, we are not responsible for any security loopholes, you should consult your security team before using this POC in the production.





