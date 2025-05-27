/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import {
  enrichTweet,
  type EnrichedTweet,
  type TweetProps,
  type TwitterComponents,
} from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";

import { cn } from "@/lib/utils";

// Interfaz extendida para incluir campos adicionales
interface ExtendedTweetUser {
  highlighted_label?: {
    badge?: {
      url: string;
    };
    description?: string;
  };
}

// Interfaz extendida para incluir campos adicionales
interface ExtendedEnrichedTweet extends EnrichedTweet {
  retweet_count?: number;
}

interface TwitterIconProps {
  className?: string;
  [key: string]: unknown;
}

// X logo (antes Twitter)
const XLogo = ({ className, ...props }: TwitterIconProps) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M13.3174 10.7749L19.1457 4H17.7646L12.7852 9.88168L8.80545 4H4L10.0201 13.1262L4 20.0863H5.38119L10.5515 14.0195L14.6968 20.0863H19.5023L13.3174 10.7749ZM11.1305 13.198L10.4926 12.2642L5.96001 5.52803H8.10554L11.6742 10.8722L12.3121 11.806L17.0202 18.9537H14.8747L11.1305 13.198Z"
    />
  </svg>
);

// Logo de verificación actualizado
const Verified = ({ className, ...props }: TwitterIconProps) => (
  <svg
    viewBox="0 0 22 22"
    aria-label="Verified Account"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
    />
  </svg>
);

// Logo de empresa
const CompanyBadge = ({ url, className }: { url: string; className?: string }) => (
  <img
    src={url}
    alt="Company Badge"
    className={cn("ml-1 inline-block h-4 w-4 rounded-full", className)}
  />
);

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("rounded-md bg-primary/10", className)} {...props} />
  );
};

export const TweetSkeleton = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: unknown;
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-3 rounded-2xl border border-border/40 bg-card/50 p-5 shadow-sm backdrop-blur-sm",
      className,
    )}
    {...props}
  >
    <div className="flex flex-row gap-3">
      <Skeleton className="size-12 shrink-0 rounded-full bg-muted" />
      <Skeleton className="h-12 w-full bg-muted" />
    </div>
    <Skeleton className="h-24 w-full bg-muted" />
    <Skeleton className="h-6 w-full bg-muted" />
  </div>
);

export const TweetNotFound = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: unknown;
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-2xl border border-border/40 bg-card/50 p-5 text-muted-foreground shadow-sm backdrop-blur-sm",
      className,
    )}
    {...props}
  >
    <XLogo className="mb-2 h-10 w-10 text-muted-foreground/70" />
    <h3 className="text-sm font-medium">Tweet no encontrado</h3>
  </div>
);

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => {
  // Fecha formateada como "Mar 22"
  const formattedDate = new Date(tweet.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Compañía destacada si existe
  const companyBadge = (tweet.user as unknown as ExtendedTweetUser).highlighted_label?.badge?.url;

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <a
            href={`https://twitter.com/${tweet.user.screen_name}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <img
              src={tweet.user.profile_image_url_https}
              alt={tweet.user.screen_name}
              width={48}
              height={48}
              className="h-10 w-10 !m-0 rounded-full"
            />
          </a>

          {/* Encabezado con nombre/usuario */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-x-1">
              <a
                href={`https://twitter.com/${tweet.user.screen_name}`}
                target="_blank"
                rel="noreferrer"
                className="truncate text-base font-bold text-foreground hover:underline"
              >
                {tweet.user.name}
              </a>

              {/* Verificación */}
              {tweet.user.is_blue_verified && (
                <Verified className="inline-block h-[18px] w-[18px] text-[#1D9BF0]" />
              )}

              {/* Badge de empresa si existe */}
              {companyBadge && (
                <div className="flex items-center">
                  <div className="ml-0.5 flex h-5 items-center justify-center rounded-sm bg-zinc-900 px-1">
                    <CompanyBadge url={companyBadge} />
                  </div>
                </div>
              )}

              <span className="text-sm text-muted-foreground">
                @{tweet.user.screen_name}
              </span>

              <span className="text-sm text-muted-foreground">·</span>

              <span className="text-sm text-muted-foreground hover:underline">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Icono X */}
      <div className="ml-4 mt-1 flex shrink-0 items-start">
        <XLogo className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="mt-1 break-words text-[15px] leading-normal text-foreground">
    {tweet.text}
  </div>
);

export const TweetShowMore = ({ tweet }: { tweet: EnrichedTweet }) => (
  <a
    href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
    target="_blank"
    rel="noreferrer"
    className="mt-1 text-[15px] font-medium text-[#1D9BF0] hover:underline"
  >
    Show more
  </a>
);

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
  if (!tweet.video && !tweet.photos) return null;
  return (
    <div className="mt-3 flex flex-1 items-center justify-center">
      {tweet.video && (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl border border-border/40 shadow-sm"
        >
          <source src={tweet.video.variants[0].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {tweet.photos && (
        <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto">
          <div className="shrink-0 snap-center sm:w-2" />
          {tweet.photos.map((photo) => (
            <img
              key={photo.url}
              src={photo.url}
              title={"Photo by " + tweet.user.name}
              alt={tweet.text}
              className="h-64 w-5/6 !m-0 shrink-0 snap-center snap-always rounded-xl border border-border/40 object-cover shadow-sm"
            />
          ))}
          <div className="shrink-0 snap-center sm:w-2" />
        </div>
      )}
      {!tweet.video &&
        !tweet.photos &&
        // @ts-ignore
        tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && (
          <img
            src={
              // @ts-ignore
              tweet.card.binding_values.thumbnail_image_large.image_value.url
            }
            className="h-64 rounded-xl !m-0 border border-border/40 object-cover shadow-sm"
            alt={tweet.text}
          />
        )}
    </div>
  );
};

export const TweetActions = ({ tweet }: { tweet: EnrichedTweet }) => {
  // Valores reales si están disponibles
  const replies = tweet.conversation_count || 9;
  const retweets = (tweet as unknown as ExtendedEnrichedTweet).retweet_count || 9;
  const likes = tweet.favorite_count || 224;
  const views = 52; // Suponiendo aprox 52K

  return (
    <div className="mt-3 flex justify-between text-muted-foreground">
      <button className="group flex items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-blue-500/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:text-[#1D9BF0]">
            <path
              fill="currentColor"
              d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
            />
          </svg>
        </div>
        <span className="text-sm group-hover:text-[#1D9BF0]">{replies}</span>
      </button>

      <button className="group flex items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-green-500/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:text-[#00BA7C]">
            <path
              fill="currentColor"
              d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
            />
          </svg>
        </div>
        <span className="text-sm group-hover:text-[#00BA7C]">{retweets}</span>
      </button>

      <button className="group flex items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-pink-500/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:text-[#F91880]">
            <path
              fill="currentColor"
              d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
            />
          </svg>
        </div>
        <span className="text-sm group-hover:text-[#F91880]">{likes}</span>
      </button>

      <button className="group flex items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-blue-500/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:text-[#1D9BF0]">
            <path
              fill="currentColor"
              d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
            />
          </svg>
        </div>
        <span className="text-sm group-hover:text-[#1D9BF0]">{views}K</span>
      </button>

      <button className="group">
        <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-blue-500/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:text-[#1D9BF0]">
            <path
              fill="currentColor"
              d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export const MagicTweet = ({
  tweet,
  components,
  className,
  ...props
}: {
  tweet: Tweet;
  components?: TwitterComponents;
  className?: string;
}) => {
  const enrichedTweet = enrichTweet(tweet);

  return (
    <div
      className={cn(
        "relative flex w-full mx-auto flex-col overflow-hidden rounded-none border-x border-y border-border bg-card p-4",
        className,
      )}
      {...props}
    >
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      <TweetShowMore tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
      <TweetActions tweet={enrichedTweet} />
    </div>
  );
};

/**
 * TweetCard (Server Side Only)
 */
export const TweetCard = async ({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & {
  className?: string;
}) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
      if (onError) {
        onError(err);
      } else {
        console.error(err);
      }
    })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound {...props} />;
  }

  console.log({ stringified: JSON.stringify(tweet, null, 2) });

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={tweet} {...props} />
    </Suspense>
  );
};
