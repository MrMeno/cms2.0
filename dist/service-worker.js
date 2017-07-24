/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["e:/05源码管理/cms/node/cms2.0/dist/061bff56485ee64ac587de58d47b3a2c.png","061bff56485ee64ac587de58d47b3a2c"],["e:/05源码管理/cms/node/cms2.0/dist/125eea94ef886a275ed3fec1baf8c985.png","125eea94ef886a275ed3fec1baf8c985"],["e:/05源码管理/cms/node/cms2.0/dist/1718af45232e0f7ae4ae5ad73f3cab97.png","1718af45232e0f7ae4ae5ad73f3cab97"],["e:/05源码管理/cms/node/cms2.0/dist/20a88a5e14c587b0ad3eb30662da6ab5.png","20a88a5e14c587b0ad3eb30662da6ab5"],["e:/05源码管理/cms/node/cms2.0/dist/360106c36857e5e831146ceba683b8c7.png","360106c36857e5e831146ceba683b8c7"],["e:/05源码管理/cms/node/cms2.0/dist/39d527acef30a8a2ea71a06aad83465e.png","39d527acef30a8a2ea71a06aad83465e"],["e:/05源码管理/cms/node/cms2.0/dist/425dd0e751b25331824fbe7018421cdd.png","425dd0e751b25331824fbe7018421cdd"],["e:/05源码管理/cms/node/cms2.0/dist/448c34a56d699c29117adc64c43affeb.woff2","448c34a56d699c29117adc64c43affeb"],["e:/05源码管理/cms/node/cms2.0/dist/5a09ed264a844ac08e88773addd24e36.png","5a09ed264a844ac08e88773addd24e36"],["e:/05源码管理/cms/node/cms2.0/dist/674f50d287a8c48dc19ba404d20fe713.eot","674f50d287a8c48dc19ba404d20fe713"],["e:/05源码管理/cms/node/cms2.0/dist/7a47e55e71c274a8c235cf7ea067eebc.png","7a47e55e71c274a8c235cf7ea067eebc"],["e:/05源码管理/cms/node/cms2.0/dist/820991471788649a788ea44161781d6a.png","820991471788649a788ea44161781d6a"],["e:/05源码管理/cms/node/cms2.0/dist/89889688147bd7575d6327160d64e760.svg","89889688147bd7575d6327160d64e760"],["e:/05源码管理/cms/node/cms2.0/dist/8d2fcaec38e7f5d4df6c1bd8bb5951b5.png","8d2fcaec38e7f5d4df6c1bd8bb5951b5"],["e:/05源码管理/cms/node/cms2.0/dist/906912e0b4d3e017584f62fc785ca27b.png","906912e0b4d3e017584f62fc785ca27b"],["e:/05源码管理/cms/node/cms2.0/dist/912ec66d7572ff821749319396470bde.svg","912ec66d7572ff821749319396470bde"],["e:/05源码管理/cms/node/cms2.0/dist/9d1c08b6e85ac1a596f2ab5cc7ab366a.png","9d1c08b6e85ac1a596f2ab5cc7ab366a"],["e:/05源码管理/cms/node/cms2.0/dist/a3dc44f0a78b9c380568c4c95d2fa827.png","a3dc44f0a78b9c380568c4c95d2fa827"],["e:/05源码管理/cms/node/cms2.0/dist/af7ae505a9eed503f8b8e6982036873e.woff2","af7ae505a9eed503f8b8e6982036873e"],["e:/05源码管理/cms/node/cms2.0/dist/app.server.2be68b6e552e731da785.js","887049bd93f7ff936ec10ce72e94a254"],["e:/05源码管理/cms/node/cms2.0/dist/b02bdc1b846fd65473922f5f62832108.ttf","b02bdc1b846fd65473922f5f62832108"],["e:/05源码管理/cms/node/cms2.0/dist/b06871f281fee6b241d60582ae9369b9.ttf","b06871f281fee6b241d60582ae9369b9"],["e:/05源码管理/cms/node/cms2.0/dist/b634f6781464fde4a76c46b71d6215bd.png","b634f6781464fde4a76c46b71d6215bd"],["e:/05源码管理/cms/node/cms2.0/dist/bf5e9435100d66897a2f23dcaafd2b0e.png","bf5e9435100d66897a2f23dcaafd2b0e"],["e:/05源码管理/cms/node/cms2.0/dist/common.2be68b6e552e731da785.css","31b17b607da84c6e484c79ebee39596a"],["e:/05源码管理/cms/node/cms2.0/dist/d5c22776df6053b42330a7b5dd828333.png","d5c22776df6053b42330a7b5dd828333"],["e:/05源码管理/cms/node/cms2.0/dist/e18bbf611f2a2e43afc071aa2f4e1512.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["e:/05源码管理/cms/node/cms2.0/dist/f4769f9bdb7466be65088239c12046d1.eot","f4769f9bdb7466be65088239c12046d1"],["e:/05源码管理/cms/node/cms2.0/dist/f8b1ace8753a989a9ce922bc560fcf09.png","f8b1ace8753a989a9ce922bc560fcf09"],["e:/05源码管理/cms/node/cms2.0/dist/fa2772327f55d8198301fdb8bcfc8158.woff","fa2772327f55d8198301fdb8bcfc8158"],["e:/05源码管理/cms/node/cms2.0/dist/fe359562b80d3b83f3b1c38611b99d47.png","fe359562b80d3b83f3b1c38611b99d47"],["e:/05源码管理/cms/node/cms2.0/dist/fee66e712a8a08eef5805a46892932ad.woff","fee66e712a8a08eef5805a46892932ad"],["e:/05源码管理/cms/node/cms2.0/dist/manifest.server.9d45f25e669d04138643.js","45228dc013e8836489423802bba3c716"],["e:/05源码管理/cms/node/cms2.0/dist/vendor.server.4c872c9ed529082d3350.js","299d6382660cf5384131cdd26b8cb5b2"],["e:/05源码管理/cms/node/cms2.0/dist/vue-ssr-client-manifest.json","e42a9d95f594db63e41ae0ba3a5223ce"]];
var cacheName = 'sw-precache-v3-vue-hn-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







