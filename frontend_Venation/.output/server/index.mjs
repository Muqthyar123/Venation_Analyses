globalThis.__nitro_main__ = import.meta.url;
import { b as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/about-wAAq919f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2536-T8RglAMmPUpYxhd3np5QSRb2kIk"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 9526,
    "path": "../public/assets/about-wAAq919f.js"
  },
  "/assets/AG-S-DD9HQJE-.jpg": {
    "type": "image/jpeg",
    "etag": '"1fe4e-I4q+HOkMQhPCl0PJqTIM17VqqkY"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 130638,
    "path": "../public/assets/AG-S-DD9HQJE-.jpg"
  },
  "/assets/AI-S-DfsFfjym.jpg": {
    "type": "image/jpeg",
    "etag": '"49c93-/bpRYCQSFD0eIAWuCSa98xXCzGI"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 302227,
    "path": "../public/assets/AI-S-DfsFfjym.jpg"
  },
  "/assets/BA-S-RC1Y-rGF.jpg": {
    "type": "image/jpeg",
    "etag": '"1f4d4-GujGE1sGHdY4nlO06XVYYckDj0Q"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 128212,
    "path": "../public/assets/BA-S-RC1Y-rGF.jpg"
  },
  "/assets/AH-S-R3v3TXVg.jpg": {
    "type": "image/jpeg",
    "etag": '"67666-UsMCTiNo8PI2B6XwJLCwIrhBu7Q"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 423526,
    "path": "../public/assets/AH-S-R3v3TXVg.jpg"
  },
  "/assets/brain-DzsuUB6P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"242-ITsVTWg7D93RyIe6OGZibthoQF0"',
    "mtime": "2026-07-30T16:42:47.846Z",
    "size": 578,
    "path": "../public/assets/brain-DzsuUB6P.js"
  },
  "/assets/AV-S-CPdMtpAN.jpg": {
    "type": "image/jpeg",
    "etag": '"31825-0l7bi76DODaRtYrqyBhPF65y7oA"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 202789,
    "path": "../public/assets/AV-S-CPdMtpAN.jpg"
  },
  "/assets/BJ-S-002-hpOrIGVG.jpg": {
    "type": "image/jpeg",
    "etag": '"2d7ac-yidh6yD39fFGc5Z/vygOiZuaL7k"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 186284,
    "path": "../public/assets/BJ-S-002-hpOrIGVG.jpg"
  },
  "/assets/check-BWk0U5aU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"78-s+Ypy5gfD+r1XQhFGGFPz4RL0ic"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 120,
    "path": "../public/assets/check-BWk0U5aU.js"
  },
  "/assets/dataset-xdsQg2Rs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed7-JagCgGJT/PKZ0fwKVKUbL5sbcqI"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 3799,
    "path": "../public/assets/dataset-xdsQg2Rs.js"
  },
  "/assets/contact-BboTbAfb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bf3-+nFfLpFHR9u+AfpN44nytSOX0Uw"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 3059,
    "path": "../public/assets/contact-BboTbAfb.js"
  },
  "/assets/CC-S-028-BsC6PKoX.jpg": {
    "type": "image/jpeg",
    "etag": '"33f64-MxnVpV1pwXoiqb9v+OLgvZVOXwM"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 212836,
    "path": "../public/assets/CC-S-028-BsC6PKoX.jpg"
  },
  "/assets/CL-S-C1hM5wft.jpg": {
    "type": "image/jpeg",
    "etag": '"5f350-0Ep/mU4Plt4LMzRDXYlYWYIXypQ"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 389968,
    "path": "../public/assets/CL-S-C1hM5wft.jpg"
  },
  "/assets/FA-S-dKTetQ3i.jpg": {
    "type": "image/jpeg",
    "etag": '"49587-pg2DRAllu0z63m9KJvwjl0M1zF0"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 300423,
    "path": "../public/assets/FA-S-dKTetQ3i.jpg"
  },
  "/assets/FR-S-DAbVeuXI.jpg": {
    "type": "image/jpeg",
    "etag": '"4cfe9-t0naYUiBXK8DdGB3WEpVjegwvp4"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 315369,
    "path": "../public/assets/FR-S-DAbVeuXI.jpg"
  },
  "/assets/download-CaWdJorR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e9-MtjE+Wt1Y40WHsbmquvw/SEV6Gw"',
    "mtime": "2026-07-30T16:42:47.846Z",
    "size": 233,
    "path": "../public/assets/download-CaWdJorR.js"
  },
  "/assets/image-actions-D8wreseO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"619-F0D5QLdiUm/4Wws2XAoVxygvfTw"',
    "mtime": "2026-07-30T16:42:47.853Z",
    "size": 1561,
    "path": "../public/assets/image-actions-D8wreseO.js"
  },
  "/assets/HR-S-BqwDUWxQ.jpg": {
    "type": "image/jpeg",
    "etag": '"1d750-oQvl7/FT5mFNWl+UTgLUmh4YoaI"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 120656,
    "path": "../public/assets/HR-S-BqwDUWxQ.jpg"
  },
  "/assets/hero-banner-BoEGvt1W.jpg": {
    "type": "image/jpeg",
    "etag": '"28452-WeX/tClf53eF4oONlRwmEc0VRFs"',
    "mtime": "2026-07-30T16:42:47.832Z",
    "size": 164946,
    "path": "../public/assets/hero-banner-BoEGvt1W.jpg"
  },
  "/assets/index-CJZz2bX7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c74-xlx3a11AHzoOeeLfCHkqA/6v6UI"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 7284,
    "path": "../public/assets/index-CJZz2bX7.js"
  },
  "/assets/J-S-7YS3HC_c.jpg": {
    "type": "image/jpeg",
    "etag": '"4f20a-9GUMPxPu9bZc1hCJKd49+/Gu5go"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 324106,
    "path": "../public/assets/J-S-7YS3HC_c.jpg"
  },
  "/assets/loader-circle-wAT8x0hx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c-Od+wVBHryHfQnv3tPYg5SHRukxo"',
    "mtime": "2026-07-30T16:42:47.860Z",
    "size": 140,
    "path": "../public/assets/loader-circle-wAT8x0hx.js"
  },
  "/assets/layers-DBrzjQZj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a6-cYf/GOlDL69bQWv9XsIOVCLpgIs"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 422,
    "path": "../public/assets/layers-DBrzjQZj.js"
  },
  "/assets/index-BIKTfRvm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6a99f-xFk6FkbIfpQEFT+Dd80MTYeLDME"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 436639,
    "path": "../public/assets/index-BIKTfRvm.js"
  },
  "/assets/M-S-DQFY60N0.jpg": {
    "type": "image/jpeg",
    "etag": '"4ab2c-X0I5LHo8Gy+tK/gZyZtXPkAKFms"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 305964,
    "path": "../public/assets/M-S-DQFY60N0.jpg"
  },
  "/assets/MC-S-CQfWdnKC.jpg": {
    "type": "image/jpeg",
    "etag": '"4924a-CcU+oENEGz3Y8KZV6CyU5V72Lys"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 299594,
    "path": "../public/assets/MC-S-CQfWdnKC.jpg"
  },
  "/assets/MI-S-CnA_MpJA.jpg": {
    "type": "image/jpeg",
    "etag": '"2a764-4x1f5TJG+oY7nwXu7kri0RqVxHk"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 173924,
    "path": "../public/assets/MI-S-CnA_MpJA.jpg"
  },
  "/assets/MK-S-OWmL5A_I.jpg": {
    "type": "image/jpeg",
    "etag": '"121d1-vLE5F3boOMJO14KtHJfJFGKrxRE"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 74193,
    "path": "../public/assets/MK-S-OWmL5A_I.jpg"
  },
  "/assets/multi-DHDzUGzQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2548-w0GEMaypU/QRb+8wW1vCmNGITbA"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 9544,
    "path": "../public/assets/multi-DHDzUGzQ.js"
  },
  "/assets/MO-S-Cb3S1F3u.jpg": {
    "type": "image/jpeg",
    "etag": '"3502f-F0IQFQ4AbIMS532vKYTFe3JP5LE"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 217135,
    "path": "../public/assets/MO-S-Cb3S1F3u.jpg"
  },
  "/assets/NA-S-CXH4EAmf.jpg": {
    "type": "image/jpeg",
    "etag": '"4431e-efK+nJCsdn500C+9CRC6Tw0J/nc"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 279326,
    "path": "../public/assets/NA-S-CXH4EAmf.jpg"
  },
  "/assets/OT-S-BZwSqLlU.jpg": {
    "type": "image/jpeg",
    "etag": '"1b1f4-s68pFrECkf6tl6trCY6x+g2uTpE"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 111092,
    "path": "../public/assets/OT-S-BZwSqLlU.jpg"
  },
  "/assets/NO-S-CclFLee5.jpg": {
    "type": "image/jpeg",
    "etag": '"2a246-ZmlxvMMzimI8kDr/2fCGnudNlic"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 172614,
    "path": "../public/assets/NO-S-CclFLee5.jpg"
  },
  "/assets/PA-S-BMnXaOHV.jpg": {
    "type": "image/jpeg",
    "etag": '"3b194-CKfnUFwOW3EzHPtTJKZPgXUbElw"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 242068,
    "path": "../public/assets/PA-S-BMnXaOHV.jpg"
  },
  "/assets/PB-S-C7GIjV53.jpg": {
    "type": "image/jpeg",
    "etag": '"18bae-uAoGlyamUE/lws14SEkG5bt7dDE"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 101294,
    "path": "../public/assets/PB-S-C7GIjV53.jpg"
  },
  "/assets/PG-S-De3HnoNc.jpg": {
    "type": "image/jpeg",
    "etag": '"402e4-x1gBK7O/1ZuM9VE64y7eRD1rZwo"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 262884,
    "path": "../public/assets/PG-S-De3HnoNc.jpg"
  },
  "/assets/plant._name-nUWGzMGZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b32-6meE6kIon4XRe9GNXIsecACTR0A"',
    "mtime": "2026-07-30T16:42:47.846Z",
    "size": 2866,
    "path": "../public/assets/plant._name-nUWGzMGZ.js"
  },
  "/assets/PP-S-19Qj2bzP.jpg": {
    "type": "image/jpeg",
    "etag": '"540e1-FqNe//GMJ2qeipQlhwz15QOxiRg"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 344289,
    "path": "../public/assets/PP-S-19Qj2bzP.jpg"
  },
  "/assets/SectionHeader-B4z39fV_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"213-PVlyZ7RVQJ3nJ4NYWjwlLFl8hYI"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 531,
    "path": "../public/assets/SectionHeader-B4z39fV_.js"
  },
  "/assets/single-l2cxShOA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2375-RJx4NKqK05TSEJ8f+10F4pzzXxA"',
    "mtime": "2026-07-30T16:42:47.846Z",
    "size": 9077,
    "path": "../public/assets/single-l2cxShOA.js"
  },
  "/assets/SA-S-DZqzUVQV.jpg": {
    "type": "image/jpeg",
    "etag": '"46f84-XlVHwnxMIZ1IoyHnUhT0MBbMMRg"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 290692,
    "path": "../public/assets/SA-S-DZqzUVQV.jpg"
  },
  "/assets/sparkles-Avsbie4U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ef-m7iONREUjCeOgv9uvW+1BQ04SmE"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 495,
    "path": "../public/assets/sparkles-Avsbie4U.js"
  },
  "/assets/SJ-S-vX8pRIY6.jpg": {
    "type": "image/jpeg",
    "etag": '"36410-TsThshodWITe5g9PjVu2OAuShs8"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 222224,
    "path": "../public/assets/SJ-S-vX8pRIY6.jpg"
  },
  "/assets/styles-CS7rQDtj.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"153cb-r4t3zTy1kN3VdNYugpV4Wil/O90"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 86987,
    "path": "../public/assets/styles-CS7rQDtj.css"
  },
  "/assets/SC-S-E-SK5WWA.jpg": {
    "type": "image/jpeg",
    "etag": '"5e3a1-m3hrSewIlN12cZyMGwi3l1e64js"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 385953,
    "path": "../public/assets/SC-S-E-SK5WWA.jpg"
  },
  "/assets/UploadDropzone-B8EnWm70.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fd5-OwI7uleEUmNqfvdTmONYXE+ojFs"',
    "mtime": "2026-07-30T16:42:47.846Z",
    "size": 4053,
    "path": "../public/assets/UploadDropzone-B8EnWm70.js"
  },
  "/assets/TF-S-BWSQHmnM.jpg": {
    "type": "image/jpeg",
    "etag": '"1b792-4TDq6UQTaKoycYA0OUyM83P1kRM"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 112530,
    "path": "../public/assets/TF-S-BWSQHmnM.jpg"
  },
  "/assets/TD-S-f1_JPJur.jpg": {
    "type": "image/jpeg",
    "etag": '"3cd4a-UfbJ1h1fwVzYGzDk/QBMjsUJO5o"',
    "mtime": "2026-07-30T16:42:47.840Z",
    "size": 249162,
    "path": "../public/assets/TD-S-f1_JPJur.jpg"
  },
  "/assets/PG-S (2)-DpYHuJ-S.jpg": {
    "type": "image/jpeg",
    "etag": '"89541-YiPjKYlYg3stoggjxWZ8cvOaXcc"',
    "mtime": "2026-07-30T16:42:47.860Z",
    "size": 562497,
    "path": "../public/assets/PG-S (2)-DpYHuJ-S.jpg"
  },
  "/assets/Venation Architecture-DL1w299r.png": {
    "type": "image/png",
    "etag": '"1aa836-YS+6gm1FYuM1896TgL6FO/I2e90"',
    "mtime": "2026-07-30T16:42:47.866Z",
    "size": 1746998,
    "path": "../public/assets/Venation Architecture-DL1w299r.png"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _l53mYC = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_5rv3D0 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_5rv3D0 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_l53mYC)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
