import { jsx, jsxs } from 'react/jsx-runtime';
import { Suspense } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const getTweetUrl = (tweet)=>`https://x.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
const getUserUrl = (usernameOrTweet)=>`https://x.com/${typeof usernameOrTweet === 'string' ? usernameOrTweet : usernameOrTweet.user.screen_name}`;
const getLikeUrl = (tweet)=>`https://x.com/intent/like?tweet_id=${tweet.id_str}`;
const getReplyUrl = (tweet)=>`https://x.com/intent/tweet?in_reply_to=${tweet.id_str}`;
const getFollowUrl = (tweet)=>`https://x.com/intent/follow?screen_name=${tweet.user.screen_name}`;
const getHashtagUrl = (hashtag)=>`https://x.com/hashtag/${hashtag.text}`;
const getSymbolUrl = (symbol)=>`https://x.com/search?q=%24${symbol.text}`;
const getInReplyToUrl = (tweet)=>`https://x.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id_str}`;
function getEntities(tweet) {
    const textMap = Array.from(tweet.text);
    const result = [
        {
            indices: tweet.display_text_range,
            type: 'text'
        }
    ];
    addEntities(result, 'hashtag', tweet.entities.hashtags);
    addEntities(result, 'mention', tweet.entities.user_mentions);
    addEntities(result, 'url', tweet.entities.urls);
    addEntities(result, 'symbol', tweet.entities.symbols);
    if (tweet.entities.media) {
        addEntities(result, 'media', tweet.entities.media);
    }
    fixRange(tweet, result);
    return result.map((entity)=>{
        const text = textMap.slice(entity.indices[0], entity.indices[1]).join('');
        switch(entity.type){
            case 'hashtag':
                return Object.assign(entity, {
                    href: getHashtagUrl(entity),
                    text
                });
            case 'mention':
                return Object.assign(entity, {
                    href: getUserUrl(entity.screen_name),
                    text
                });
            case 'url':
            case 'media':
                return Object.assign(entity, {
                    href: entity.expanded_url,
                    text: entity.display_url
                });
            case 'symbol':
                return Object.assign(entity, {
                    href: getSymbolUrl(entity),
                    text
                });
            default:
                return Object.assign(entity, {
                    text
                });
        }
    });
}
function addEntities(result, type, entities) {
    for (const entity of entities){
        for (const [i, item] of result.entries()){
            if (item.indices[0] > entity.indices[0] || item.indices[1] < entity.indices[1]) {
                continue;
            }
            const items = [
                {
                    ...entity,
                    type
                }
            ];
            if (item.indices[0] < entity.indices[0]) {
                items.unshift({
                    indices: [
                        item.indices[0],
                        entity.indices[0]
                    ],
                    type: 'text'
                });
            }
            if (item.indices[1] > entity.indices[1]) {
                items.push({
                    indices: [
                        entity.indices[1],
                        item.indices[1]
                    ],
                    type: 'text'
                });
            }
            result.splice(i, 1, ...items);
            break; // Break out of the loop to avoid iterating over the new items
        }
    }
}
/**
 * Update display_text_range to work w/ Array.from
 * Array.from is unicode aware, unlike string.slice()
 */ function fixRange(tweet, entities) {
    if (tweet.entities.media && tweet.entities.media[0].indices[0] < tweet.display_text_range[1]) {
        tweet.display_text_range[1] = tweet.entities.media[0].indices[0];
    }
    const lastEntity = entities.at(-1);
    if (lastEntity && lastEntity.indices[1] > tweet.display_text_range[1]) {
        lastEntity.indices[1] = tweet.display_text_range[1];
    }
}
/**
 * Enriches a tweet with additional data used to more easily use the tweet in a UI.
 */ const enrichTweet = (tweet)=>({
        ...tweet,
        url: getTweetUrl(tweet),
        user: {
            ...tweet.user,
            url: getUserUrl(tweet),
            follow_url: getFollowUrl(tweet)
        },
        like_url: getLikeUrl(tweet),
        reply_url: getReplyUrl(tweet),
        in_reply_to_url: tweet.in_reply_to_screen_name ? getInReplyToUrl(tweet) : undefined,
        entities: getEntities(tweet),
        quoted_tweet: tweet.quoted_tweet ? {
            ...tweet.quoted_tweet,
            url: getTweetUrl(tweet.quoted_tweet),
            entities: getEntities(tweet.quoted_tweet)
        } : undefined
    });

const SYNDICATION_URL = 'https://cdn.syndication.twimg.com';
class TwitterApiError extends Error {
    constructor({ message, status, data }){
        super(message);
        this.name = 'TwitterApiError';
        this.status = status;
        this.data = data;
    }
}
const TWEET_ID = /^[0-9]+$/;
function getToken(id) {
    return (Number(id) / 1e15 * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, '');
}
/**
 * Fetches a tweet from the Twitter syndication API.
 */ async function fetchTweet(id, fetchOptions) {
    var _res_headers_get;
    if (id.length > 40 || !TWEET_ID.test(id)) {
        throw new Error(`Invalid tweet id: ${id}`);
    }
    const url = new URL(`${SYNDICATION_URL}/tweet-result`);
    url.searchParams.set('id', id);
    url.searchParams.set('lang', 'en');
    url.searchParams.set('features', [
        'tfw_timeline_list:',
        'tfw_follower_count_sunset:true',
        'tfw_tweet_edit_backend:on',
        'tfw_refsrc_session:on',
        'tfw_fosnr_soft_interventions_enabled:on',
        'tfw_show_birdwatch_pivots_enabled:on',
        'tfw_show_business_verified_badge:on',
        'tfw_duplicate_scribes_to_settings:on',
        'tfw_use_profile_image_shape_enabled:on',
        'tfw_show_blue_verified_badge:on',
        'tfw_legacy_timeline_sunset:true',
        'tfw_show_gov_verified_badge:on',
        'tfw_show_business_affiliate_badge:on',
        'tfw_tweet_edit_frontend:on'
    ].join(';'));
    url.searchParams.set('token', getToken(id));
    const res = await fetch(url.toString(), fetchOptions);
    const isJson = (_res_headers_get = res.headers.get('content-type')) == null ? void 0 : _res_headers_get.includes('application/json');
    const data = isJson ? await res.json() : undefined;
    if (res.ok) {
        if ((data == null ? void 0 : data.__typename) === 'TweetTombstone') {
            return {
                tombstone: true
            };
        }
        return {
            data
        };
    }
    if (res.status === 404) {
        return {
            notFound: true
        };
    }
    throw new TwitterApiError({
        message: typeof data.error === 'string' ? data.error : `Failed to fetch tweet at "${url}" with "${res.status}".`,
        status: res.status,
        data
    });
}

/**
 * Returns a tweet from the Twitter syndication API.
 */ async function getTweet(id, fetchOptions) {
    const { data, tombstone, notFound } = await fetchTweet(id, fetchOptions);
    if (notFound) {
        console.error(`The tweet ${id} does not exist or has been deleted by the account owner. Update your code to remove this tweet when possible.`);
    } else if (tombstone) {
        console.error(`The tweet ${id} has been made private by the account owner. Update your code to remove this tweet when possible.`);
    }
    return data;
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const XLogo = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "svg",
  {
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    className,
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M13.3174 10.7749L19.1457 4H17.7646L12.7852 9.88168L8.80545 4H4L10.0201 13.1262L4 20.0863H5.38119L10.5515 14.0195L14.6968 20.0863H19.5023L13.3174 10.7749ZM11.1305 13.198L10.4926 12.2642L5.96001 5.52803H8.10554L11.6742 10.8722L12.3121 11.806L17.0202 18.9537H14.8747L11.1305 13.198Z"
      }
    )
  }
);
const Verified = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "svg",
  {
    viewBox: "0 0 22 22",
    "aria-label": "Verified Account",
    className,
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
      }
    )
  }
);
const CompanyBadge = ({ url, className }) => /* @__PURE__ */ jsx(
  "img",
  {
    src: url,
    alt: "Company Badge",
    className: cn("ml-1 inline-block h-4 w-4 rounded-full", className)
  }
);
const Skeleton = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx("div", { className: cn("rounded-md bg-primary/10", className), ...props });
};
const TweetSkeleton = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: cn(
      "flex size-full max-h-max min-w-72 flex-col gap-3 rounded-2xl border border-border/40 bg-card/50 p-5 shadow-sm backdrop-blur-sm",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "size-12 shrink-0 rounded-full bg-muted" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full bg-muted" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full bg-muted" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-full bg-muted" })
    ]
  }
);
const TweetNotFound = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-2xl border border-border/40 bg-card/50 p-5 text-muted-foreground shadow-sm backdrop-blur-sm",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx(XLogo, { className: "mb-2 h-10 w-10 text-muted-foreground/70" }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Tweet no encontrado" })
    ]
  }
);
const TweetHeader = ({ tweet }) => {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
  const companyBadge = tweet.user.highlighted_label?.badge?.url;
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://twitter.com/${tweet.user.screen_name}`,
          target: "_blank",
          rel: "noreferrer",
          className: "shrink-0",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tweet.user.profile_image_url_https,
              alt: tweet.user.screen_name,
              width: 48,
              height: 48,
              className: "h-10 w-10 !m-0 rounded-full"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex min-w-0 flex-1 flex-col", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-1", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://twitter.com/${tweet.user.screen_name}`,
            target: "_blank",
            rel: "noreferrer",
            className: "truncate text-base font-bold text-foreground hover:underline",
            children: tweet.user.name
          }
        ),
        tweet.user.is_blue_verified && /* @__PURE__ */ jsx(Verified, { className: "inline-block h-[18px] w-[18px] text-[#1D9BF0]" }),
        companyBadge && /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: "ml-0.5 flex h-5 items-center justify-center rounded-sm bg-zinc-900 px-1", children: /* @__PURE__ */ jsx(CompanyBadge, { url: companyBadge }) }) }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "@",
          tweet.user.screen_name
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "·" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground hover:underline", children: formattedDate })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "ml-4 mt-1 flex shrink-0 items-start", children: /* @__PURE__ */ jsx(XLogo, { className: "h-5 w-5 text-muted-foreground" }) })
  ] });
};
const TweetBody = ({ tweet }) => /* @__PURE__ */ jsx("div", { className: "mt-1 break-words text-[15px] leading-normal text-foreground", children: tweet.text });
const TweetShowMore = ({ tweet }) => /* @__PURE__ */ jsx(
  "a",
  {
    href: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
    target: "_blank",
    rel: "noreferrer",
    className: "mt-1 text-[15px] font-medium text-[#1D9BF0] hover:underline",
    children: "Show more"
  }
);
const TweetMedia = ({ tweet }) => {
  if (!tweet.video && !tweet.photos) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-1 items-center justify-center", children: [
    tweet.video && /* @__PURE__ */ jsxs(
      "video",
      {
        poster: tweet.video.poster,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        className: "rounded-xl border border-border/40 shadow-sm",
        children: [
          /* @__PURE__ */ jsx("source", { src: tweet.video.variants[0].src, type: "video/mp4" }),
          "Your browser does not support the video tag."
        ]
      }
    ),
    tweet.photos && /* @__PURE__ */ jsxs("div", { className: "relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "shrink-0 snap-center sm:w-2" }),
      tweet.photos.map((photo) => /* @__PURE__ */ jsx(
        "img",
        {
          src: photo.url,
          title: "Photo by " + tweet.user.name,
          alt: tweet.text,
          className: "h-64 w-5/6 !m-0 shrink-0 snap-center snap-always rounded-xl border border-border/40 object-cover shadow-sm"
        },
        photo.url
      )),
      /* @__PURE__ */ jsx("div", { className: "shrink-0 snap-center sm:w-2" })
    ] }),
    !tweet.video && !tweet.photos && // @ts-ignore
    tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && /* @__PURE__ */ jsx(
      "img",
      {
        src: (
          // @ts-ignore
          tweet.card.binding_values.thumbnail_image_large.image_value.url
        ),
        className: "h-64 rounded-xl !m-0 border border-border/40 object-cover shadow-sm",
        alt: tweet.text
      }
    )
  ] });
};
const TweetActions = ({ tweet }) => {
  const replies = tweet.conversation_count || 9;
  const retweets = tweet.retweet_count || 9;
  const likes = tweet.favorite_count || 224;
  const views = 52;
  return /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-between text-muted-foreground", children: [
    /* @__PURE__ */ jsxs("button", { className: "group flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-blue-500/10", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 group-hover:text-[#1D9BF0]", children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
        }
      ) }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm group-hover:text-[#1D9BF0]", children: replies })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "group flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-green-500/10", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 group-hover:text-[#00BA7C]", children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
        }
      ) }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm group-hover:text-[#00BA7C]", children: retweets })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "group flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-pink-500/10", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 group-hover:text-[#F91880]", children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
        }
      ) }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm group-hover:text-[#F91880]", children: likes })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "group flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-blue-500/10", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 group-hover:text-[#1D9BF0]", children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm group-hover:text-[#1D9BF0]", children: [
        views,
        "K"
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "group", children: /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-blue-500/10", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5 group-hover:text-[#1D9BF0]", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
      }
    ) }) }) })
  ] });
};
const MagicTweet = ({
  tweet,
  components,
  className,
  ...props
}) => {
  const enrichedTweet = enrichTweet(tweet);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex w-full mx-auto flex-col overflow-hidden rounded-none border-x border-y border-border bg-card p-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(TweetHeader, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx(TweetBody, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx(TweetShowMore, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx(TweetMedia, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx(TweetActions, { tweet: enrichedTweet })
      ]
    }
  );
};
const TweetCard = async ({
  id,
  components,
  fallback = /* @__PURE__ */ jsx(TweetSkeleton, {}),
  onError,
  ...props
}) => {
  const tweet = id ? await getTweet(id).catch((err) => {
    if (onError) {
      onError(err);
    } else {
      console.error(err);
    }
  }) : void 0;
  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return /* @__PURE__ */ jsx(NotFound, { ...props });
  }
  console.log({ stringified: JSON.stringify(tweet, null, 2) });
  return /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(MagicTweet, { tweet, ...props }) });
};

export { TweetCard as T };
