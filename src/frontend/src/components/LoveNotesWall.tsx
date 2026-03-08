import { Skeleton } from "@/components/ui/skeleton";
import type { LoveNote } from "../backend.d";
import { useGetAllNotes } from "../hooks/useQueries";

function timeAgo(timestampNs: bigint): string {
  const ms = Number(timestampNs / 1_000_000n);
  const now = Date.now();
  const diffMs = now - ms;

  if (diffMs < 0) return "just now";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (weeks < 5) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  return `${months} month${months !== 1 ? "s" : ""} ago`;
}

const HEART_VARIANTS = [
  "oklch(0.65 0.18 12)",
  "oklch(0.72 0.15 10)",
  "oklch(0.80 0.12 70)",
  "oklch(0.58 0.18 15)",
];

function NoteCard({ note, index }: { note: LoveNote; index: number }) {
  const heartColor = HEART_VARIANTS[index % HEART_VARIANTS.length];
  const ocid = `notes.item.${index + 1}` as const;

  return (
    <article
      data-ocid={ocid}
      className="note-card bg-card rounded-2xl p-6 shadow-romantic border border-border/60 flex flex-col gap-3 group"
    >
      {/* Heart accent */}
      <div className="flex items-center justify-between">
        <svg
          role="img"
          aria-label="Heart"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={heartColor}
          style={{ filter: `drop-shadow(0 2px 4px ${heartColor}66)` }}
        >
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
        </svg>
        <time
          className="text-xs text-muted-foreground font-body"
          dateTime={new Date(Number(note.timestamp / 1_000_000n)).toISOString()}
        >
          {timeAgo(note.timestamp)}
        </time>
      </div>

      {/* Message */}
      <p className="font-body text-foreground/90 text-base leading-relaxed flex-1 line-clamp-6">
        "{note.message}"
      </p>

      {/* Bottom decorative line */}
      <div
        className="h-px w-full mt-1 opacity-40 rounded-full"
        style={{
          background: `linear-gradient(to right, transparent, ${heartColor}, transparent)`,
        }}
      />
    </article>
  );
}

function LoadingSkeleton() {
  return (
    <div
      data-ocid="notes.loading_state"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders
          key={i}
          className="rounded-2xl p-6 border border-border/60 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="w-20 h-3 rounded" />
          </div>
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-4/5 h-4 rounded" />
          <Skeleton className="w-3/5 h-4 rounded" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      data-ocid="notes.empty_state"
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="relative mb-6">
        <svg
          role="img"
          aria-label="Heart"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="oklch(0.85 0.06 15)"
        >
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
        </svg>
        <svg
          role="img"
          aria-label="Heart"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="oklch(0.72 0.12 10)"
          className="absolute -bottom-1 -right-1"
        >
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
        </svg>
      </div>
      <h3 className="font-display text-2xl font-semibold italic text-foreground/70 mb-2">
        No love notes yet
      </h3>
      <p className="font-body text-muted-foreground max-w-xs text-sm leading-relaxed">
        Be the first to share your heart. Scroll down to send a love note.
      </p>
    </div>
  );
}

// Sample notes for first load experience
const SAMPLE_NOTES: LoveNote[] = [
  {
    message:
      "Every morning I wake up grateful that you chose to love me. You are my favorite adventure.",
    timestamp: BigInt(Date.now() - 2 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    message:
      "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    timestamp: BigInt(Date.now() - 5 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    message:
      "You are my today and all of my tomorrows. Thank you for being my person.",
    timestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    message:
      "Dancing with you in the kitchen at midnight — that's what forever is made of.",
    timestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    message:
      "I fell in love with the way you laugh at your own jokes before the punchline even arrives.",
    timestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    message:
      "You make ordinary moments extraordinary. Happy Valentine's Day, my love.",
    timestamp: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
];

export default function LoveNotesWall() {
  const { data: notes, isLoading, isError } = useGetAllNotes();

  // Use real notes if available, otherwise show samples
  const displayNotes =
    notes && notes.length > 0
      ? notes
      : !isLoading && !isError
        ? SAMPLE_NOTES
        : [];

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <div className="petal-divider mb-8">
            <span className="font-display text-3xl md:text-4xl font-bold italic text-foreground">
              Love Notes
            </span>
          </div>
          <p className="font-body text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            Whispers from the heart — shared by those who dare to speak love
            aloud.
          </p>
        </div>

        {/* Notes grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <div data-ocid="notes.error_state" className="text-center py-12">
            <p className="text-muted-foreground font-body text-sm">
              Couldn't load notes right now. Please try again shortly.
            </p>
          </div>
        ) : displayNotes.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            data-ocid="notes.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {displayNotes.map((note, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: notes have no stable IDs
              <NoteCard key={`note-${i}`} note={note} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
